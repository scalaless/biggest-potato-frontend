import React from 'react'

const CartEmpty = () => {
    return(
    <div class="wrapper">
      <div class="content">
        <div class="container container--cart">
          <div class="cart cart--empty">
            <h2>Корзина пустая <icon>😕</icon></h2>
            <p>
              Вероятней всего, вы не фермер с грядки.<br />
              Для того, чтобы трансформироваться, перейди на главную страницу (в амбар - ранчо).
            </p>
            <img src="/img/empty-cart.png" alt="Empty cart" />
            <a href="/" class="button button--black">
              <span>🏠 Домой</span>
            </a>
          </div>
        </div>
      </div>
    </div>           
    )
 
}

export default CartEmpty