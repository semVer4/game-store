import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { OrderItem } from '../../components/order-item';
import { calcTotalPrice, enumerate } from '../../components/utils';
import './order-page.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDM0QhgW7r0EFvTJsx8SQo7Ot4BSsTIbO0",
    authDomain: "game-store-one.firebaseapp.com",
    projectId: "game-store-one",
    storageBucket: "game-store-one.appspot.com",
    messagingSenderId: "777893446023",
    appId: "1:777893446023:web:4b00b8586c28f06cd69322",
    measurementId: "G-MYLWLR99PX"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const OrderPage = () => {
    //const items = useSelector((state) => state.cart.itemsInCart);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        setUser(user);
        if (user) {
          // Если пользователь авторизован, загрузите его корзину из базы данных
          loadCart(user.uid);
        }
      });
    }, []);
  
    const loadCart = async (userId) => {
      const snapshot = await db.collection('carts').doc(userId).get();
      if (snapshot.exists) {
        setCart(snapshot.data().cart);
      } else {
        setCart([]);
      }
    };  

    if(cart.length < 1) {
        return <h1>Ваша корзина пуста!</h1>
    }

    return (
        <div className="order-page">
            <div className="order-page__left">
                { cart.map(game => <OrderItem game={game} key={game.id} />) }
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>{ cart.length } { enumerate(cart.length, ['товар', 'товара', 'товаров'])} на сумму {calcTotalPrice(cart)} руб.</span>
                </div>
            </div>
        </div>
    )
}
