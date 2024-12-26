import './scss/app.scss';
import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import EmptyCart from './pages/EmptyCart';
import { Route, Routes } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext('');

function App() {
    const pathName = window.location.pathname;
    const [searchPotatoValue, setSearchPotatoValue] = useState('');

    return (
        <div>
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
