import './scss/app.scss';
import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import EmptyCart from './pages/EmptyCart';
import { Route, Routes } from 'react-router-dom';

function App() {
  const pathName = window.location.pathname;

  return (
    <div>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<EmptyCart />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
