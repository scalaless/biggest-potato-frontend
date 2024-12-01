import { useState } from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Categories from './Components/Categories';
import PotatoBlock from './Components/PotatoBlock';

function App() {
  return (
    <body>
      <div class="wrapper">
        <Header />
        <div class="content">
          <div class="container">
            <div class="content__top">
              <Categories />
              <div class="sort">
                <div class="sort__label">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                      fill="#2C2C2C"
                    />
                  </svg>
                  <b>Сортировка по:</b>
                  <span>популярности</span>
                </div>
                <div class="sort__popup">
                  <ul>
                    <li class="active">популярности</li>
                    <li>цене</li>
                    <li>алфавиту</li>
                  </ul>
                </div>
              </div>
            </div>
            <h2 class="content__title">Вся картошка</h2>
            <div class="content__items">
              <PotatoBlock title="first potato" price={300} />
              <PotatoBlock title="second potato" price={500} />
              <PotatoBlock title="third potato" price={430} />
              <PotatoBlock title="4d potato" price={250} />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
