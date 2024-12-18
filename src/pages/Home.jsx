import React from 'react'
import { useEffect, useState } from 'react';

import '../scss/app.scss';
import Categories from '../Components/Categories';
import PotatoBlock from '../Components/PotatoBlock';
import axios from 'axios';
import SortPlease from '../Components/SortPlease';
import Sceleton from '../Components/PotatoBlock/Sceleton';

const Home = () => {
    const [isLoading, setIsCloading] = useState(true)
    const [potatoes, setPotatoes] = useState([])

    const [currentCategory, setCurrentCategory] = useState({ id: 0, title: "Все категории" })
    const [selectedSort, setSelectedSort] = useState({ name: "популярности", v: "Rating" })

    useEffect(() => {
        setIsCloading(true)

        const params = {}
        if (currentCategory.id !== 0) params.category = currentCategory.id
        if (selectedSort.id !== 0) params.sort = selectedSort.v
        // axios.get("http://localhost:548700/potatoes/list")
        console.log(params, "!!!!!PARAMS")
        axios.get("http://95.142.35.105:54870/potatoes/list", {params})
            .then((response) => {
                setPotatoes(response.data);
                console.log(response.data);
                setIsCloading(false)
            })
            .catch((error) => {
                console.error("There was an error fetching the potatoes!", error);
            });
        window.scrollTo(0, 0)
    }, [currentCategory, selectedSort]);

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
                            isLoading ? [...new Array(12)].map((_, i) => <Sceleton key={i} />) : potatoes.map((potato) => (
                                <PotatoBlock key={potato.id} {...potato} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home