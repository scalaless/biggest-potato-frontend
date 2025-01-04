import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../redux/slices/cartSlice';

const CartItem = ({ position }) => {
    const { cartId } = useSelector(s=>s.cart)
    const dispatch = useDispatch()

    const [potato, setPotato] = useState({})
    const [size, setSize] = useState("")
    const [type, setType] = useState("")

    const fetchSizes = async () => {
        try {
            const resp = await axios.get("http://95.142.35.105:54870/sizes/list", {})
            setSize(resp.data.filter(x=>x.id === position.sizeId)[0].name)
        } catch (err) {
            console.error(err)
            
        }
    }

    const fetchTypes = async () => {
        try {
            const resp = await axios.get("http://95.142.35.105:54870/types/list", {})
            setType(resp.data.filter(x=>x.id === position.typeId)[0].name)
        } catch (err) {
            console.error(err)
            
        }
    }

    const fetchPotato = async () => {
        try {
            const resp = await axios.get(`http://95.142.35.105:54870/potatoes?id=${position.potatoId}`,{})
                const { title, img, price, } = resp.data
                setPotato({ title, img, price, })
    
                fetchSizes()
                fetchTypes()
        } catch (err) {
            console.error(err)
            
        }
    }

    useEffect(()=>{
        fetchPotato()
    },[])

    const onRemoveItem = async () => {
        const removeFromCart = async (cartId, positionId) => {
            try {
                const requestBody = {
                    id: positionId,
                };
        
                const response = await axios.delete(`http://95.142.35.105:54870/cart/removeFrom`, {
                    params: {
                        id: cartId,
                    },
                    data: requestBody,
                });
            } catch (error) {
                console.error(error);
            }
        };
        
        await removeFromCart(cartId, position.ID);

        dispatch(removeProduct(position.potatoId, potato.price))
    }

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={potato.img}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{potato.title}</h3>
                <p>{type} ({size})</p>   
            </div>
            {/* <div className="cart__item-count">
                <div className="button button--outline button--circle cart__item-count-minus">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
                <b>2</b>
                <div className="button button--outline button--circle cart__item-count-plus">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
            </div> */}
            <div className="cart__item-price">
                <b>{potato.price} ₽</b>
            </div>
            <div onClick={() => {onRemoveItem()}} className="cart__item-remove">
                <div className="button button--outline button--circle">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"
                        />
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
