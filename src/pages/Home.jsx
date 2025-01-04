import React, { useContext, useEffect, useState } from 'react';

import '../scss/app.scss';
import Categories from '../Components/Categories';
import PotatoBlock from '../Components/PotatoBlock';
import axios from 'axios';
import SortPlease from '../Components/SortPlease';
import Sceleton from '../Components/PotatoBlock/Sceleton';
import Pagination from '../Components/Pagination';
import { AppContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPageCount } from '../redux/slices/filterSlice';
import { initCart } from '../redux/slices/cartSlice';
import { setItems, fetchPotatoList } from '../redux/slices/potatoListSlice';

const Home = () => {
    const dispatch = useDispatch();
    const currentCategory = useSelector((s) => s.filter.category);
    const sort = useSelector((s) => s.filter.sort);
    const { cartId } = useSelector((s) => s.cart);

    const { items, totalPages, loadingStatus } = useSelector(
        (s) => s.potatoList,
    );

    async function fetchCartId() {
        try {
            const response = await axios.post(
                'http://95.142.35.105:54870/cart/init',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            dispatch(initCart(response.data.id));
        } catch (error) {
            console.error('Error initializing cart:', error);
        }
    }

    const { searchPotatoValue } = useContext(AppContext);

    // const [currentCategory, setCurrentCategory] = useState({ id: "0", title: "Все категории" });
    // const [selectedSort, setSelectedSort] = useState({ name: "популярности", v: "Rating" });

    const [currentPage, setCurrentPage] = useState(1);

    const actualPotatoes = items.filter((obj) => {
        return obj.title
            .toLowerCase()
            .includes(searchPotatoValue.toLowerCase());
    });

    const sceletons = [...new Array(12)].map((_, i) => <Sceleton key={i} />);

    const changeCat = (cat) => {
        dispatch(setCategory(cat));
    };

    const fetchPotatoes = async () => {
        dispatch(fetchPotatoList({ currentCategory, sort, currentPage }));
    };

    useEffect(() => {
        if (cartId === '') fetchCartId();

        fetchPotatoes();

        window.scrollTo(0, 0);
    }, [currentCategory, currentPage, sort]);

    return (
        <>
            <div className="content__top">
                <Categories value={currentCategory} changeCat={changeCat} />
                <SortPlease />
            </div>
            <div className="content">
                <div className="container">
                    <h2 className="content__title">Вся картошка</h2>
                    {loadingStatus === 'rejected' ? (
                        <div className="content__error-info">
                            <h2>Loading error...<icon>😕</icon></h2>
                            <p>Try later. Thx</p>
                        </div>
                    ) : (
                        <div className="content__items">
                            {loadingStatus === 'loading'
                                ? sceletons
                                : actualPotatoes.map((potato) => (
                                      <PotatoBlock
                                          key={potato.id}
                                          {...potato}
                                      />
                                  ))}
                        </div>
                    )}

                    <Pagination
                        count={totalPages}
                        onChangePage={(number) => setCurrentPage(number)}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;