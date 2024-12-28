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
import { setCategory } from '../redux/slices/filterSlice';

const Home = () => {
    const dispatch = useDispatch()
    const currentCategory = useSelector(s=>s.filter.category)
    const sort = useSelector(s=>s.filter.sort)

    const {searchPotatoValue} = useContext(AppContext)

    const [isLoading, setIsCloading] = useState(true);
    const [potatoes, setPotatoes] = useState([]);

    // const [currentCategory, setCurrentCategory] = useState({ id: "0", title: "Все категории" });
    // const [selectedSort, setSelectedSort] = useState({ name: "популярности", v: "Rating" });

    const [currentPage, setCurrentPage] = useState(1);

    const [pageCountForPagination, setPageCountForPagination] = useState(0)

    const actualPotatoes = potatoes.filter((obj) => {
        return obj.title.toLowerCase().includes(searchPotatoValue.toLowerCase());
    });

    const sceletons = [...new Array(12)].map((_, i) => <Sceleton key={i} />);

    const changeCat = (cat) => {
        console.log(cat)
        dispatch(setCategory(cat))
    }

    useEffect(() => {
        setIsCloading(true);

        const params = {};
        if (currentCategory.id !== "0") params.category = currentCategory.id;
        if (sort.name !== 'популярности') params.sort = sort.v;
        params.page = currentPage;

        axios.get("http://95.142.35.105:54870/potatoes/list", { params })
            .then((response) => {
                const { potatoes, totalPages } = response.data;
                if (Array.isArray(potatoes)) {
                    setPotatoes(potatoes);
                } else {
                    console.error("Expected an array, but got:", potatoes);
                }
                setPageCountForPagination(totalPages)
                setIsCloading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the potatoes!", error);
            });
        window.scrollTo(0, 0);
    }, [currentCategory, currentPage, sort]);

    return (
        <>
            <div className="content__top">
                <Categories value={currentCategory} changeCat={ changeCat } />
                <SortPlease  />
            </div>
            <div className="content">
                <div className="container">
                    <h2 className="content__title">Вся картошка</h2>
                    <div className="content__items">
                        {
                            isLoading ? sceletons : actualPotatoes.map((potato) => (<PotatoBlock key={potato.id} {...potato} />))
                        }
                    </div>
                    <Pagination count={pageCountForPagination} onChangePage={(number) => setCurrentPage(number)} />
                </div>
            </div>
        </>
    );
}

export default Home;