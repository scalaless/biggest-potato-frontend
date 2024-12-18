import './scss/app.scss';
import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import EmptyCart from './pages/EmptyCart';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const pathName = window.location.pathname;
  const [searchPotatoValue, setSearchPotatoValue] = useState("")

  return (
    <div>
      <div className="wrapper">
        <Header searchPotatoValue={searchPotatoValue} setSearchPotatoValue={setSearchPotatoValue}/>
        <Routes>
          <Route path="" element={<Home searchPotatoValue={searchPotatoValue} />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<EmptyCart />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
