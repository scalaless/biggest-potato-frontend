import './scss/app.scss';
import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import EmptyCart from './pages/EmptyCart';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, test } from './redux/slices/categorySlice'

export const AppContext = createContext('');

function App() {
    const pathName = window.location.pathname;
    const [searchPotatoValue, setSearchPotatoValue] = useState('');

    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}>
                    Increment
                </button>
                <span style={{fontSize: '50px'}}>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
                <button
                    aria-label="Hello value"
                    onClick={() => dispatch(test())}>
                    say hello
                </button>
            </div>

            <AppContext.Provider
                value={{ searchPotatoValue, setSearchPotatoValue }}>
                <div className="wrapper">
                    <Header />

                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />

                        <Route path="*" element={<EmptyCart />} />
                    </Routes>
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
