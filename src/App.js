import { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Categories from './Components/Categories';
import PotatoBlock from './Components/PotatoBlock';
import potatoList from "./assets/potatoList.json"
import axios from 'axios';
import SortPlease from './Components/SortPlease';

function App() {
  const [potatoes, setPotatoes] = useState([])

  useEffect(() => {
    // axios.get("http://localhost:548700/potatoes/list")
    axios.get("http://95.142.35.105:54870/potatoes/list")
      .then((response) => {
        setPotatoes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the potatoes!", error);
      });
  }, []);

  return (
    <div>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <SortPlease />
            </div>
            <h2 className="content__title">Вся картошка</h2>
            <div className="content__items">
              {
                potatoes.map((potato)=>(
                  <PotatoBlock key={potato.id} {...potato} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
