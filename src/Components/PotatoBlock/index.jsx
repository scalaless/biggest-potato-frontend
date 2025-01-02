import { useDispatch, useSelector } from 'react-redux';
import '../../scss/app.scss';
import { useState } from 'react';
import { initCart, pushProduct } from '../../redux/slices/cartSlice';
import axios from 'axios';

const PotatoBlock = ({ id, title, price, img, sizes, types }) => {
    const dispatch = useDispatch();

    const localCartId = useSelector((s) => s.cart.cartId);

    const [activeType, setActiveType] = useState(0);
    const [currentSize, setCurrentSize] = useState(0);
    const [potatoCount, setPotatoCount] = useState(0);

    const onClockAdd = () => {
        setPotatoCount(potatoCount + 1);

        const item = {
            id,
            title,
            price,
            img,
            type: types[activeType],
            size: sizes[currentSize],
        };

        async function addToCart(cartId, product) {
            try {
                const requestBody = {
                    position: {
                        potatoId: product.id,
                        typeId: product.type.id,
                        sizeId: product.size.id,
                    },
                };

                // Отправляем POST-запрос на сервер
                const response = await axios.post(
                    `http://localhost:54870/cart/push?id=${cartId}`,
                    requestBody,
                );

                dispatch(pushProduct(item));
                console.log('Product added to cart:', response.data);
            } catch (error) {
                console.error('Error adding product to cart:', error);
            }
        }

        
        // Вызов функции addToCart
        addToCart(localCartId, item);
    }

    return (
        <div className="potato-block">
            <div className="potato-block__item">
                <img className="potato-block__image" src={img} alt="Pizza" />
                <h4 className="potato-block__title">{title}</h4>
                <div className="potato-block__selector">
                    <ul>
                        {types.map((v, i) => (
                            <li
                                onClick={() => setActiveType(i)}
                                className={activeType === i ? 'active' : ''}
                                key={v.id}>
                                {v.name}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((v, i) => (
                            <li
                                onClick={() => setCurrentSize(i)}
                                className={currentSize === i ? 'active' : ''}
                                key={v.id}>
                                {v.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="potato-block__bottom">
                    <div className="potato-block__price">от {price} ₽</div>
                    <button
                        onClick={onClockAdd}
                        className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span>Добавить</span>
                        <i>{potatoCount}</i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PotatoBlock;
