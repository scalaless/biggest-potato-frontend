import React, { useContext, useEffect, useState } from 'react';

import '../scss/app.scss';
import Categories from '../Components/Categories';
import PotatoBlock from '../Components/PotatoBlock';
import axios from 'axios';
import SortPlease from '../Components/SortPlease';
import Sceleton from '../Components/PotatoBlock/Sceleton';
import Pagination from '../Components/Pagination';
import { AppContext } from '../App';

const Home = () => {
    const {searchPotatoValue} = useContext(AppContext)

    const [isLoading, setIsCloading] = useState(true);
    const [potatoes, setPotatoes] = useState([]); // Инициализируем как массив

    const [currentCategory, setCurrentCategory] = useState({ id: 0, title: "Все категории" });
    const [selectedSort, setSelectedSort] = useState({ name: "популярности", v: "Rating" });

    const [currentPage, setCurrentPage] = useState(1);

    const [pageCountForPagination, setPageCountForPagination] = useState(0)

    const actualPotatoes = potatoes.filter((obj) => {
        return obj.title.toLowerCase().includes(searchPotatoValue.toLowerCase());
    });

    const sceletons = [...new Array(12)].map((_, i) => <Sceleton key={i} />);

    useEffect(() => {
        setIsCloading(true);

        const params = {};
        if (currentCategory.id !== 0) params.category = currentCategory.id;
        if (selectedSort.id !== 0) params.sort = selectedSort.v;
        params.page = currentPage;

        axios.get("http://95.142.35.105:54870/potatoes/list", { params })
            .then((response) => {
                const { potatoes, totalPages } = response.data; // Извлекаем массив potatoes
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
    }, [currentCategory, selectedSort, currentPage]);

    return (
        <>
            <div className="content__top">
                <Categories value={currentCategory} changeCat={(i) => { setCurrentCategory(i) }} />
                <SortPlease value={selectedSort} onChangeSort={(i) => { setSelectedSort(i) }} />
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