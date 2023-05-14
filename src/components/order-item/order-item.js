import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GameCover } from '../game-cover/game-cover';
import './order-item.css';
import { deleteItemFromCart } from '../../store/cart/reducer';
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

export const OrderItem = ({ game }) => {
    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
      const db = firebase.firestore();
      const unsubscribe = db.collection("carts").onSnapshot((snapshot) => {
        const cartItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartItems);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    const deleteCartItem = async (cartItemId) => {
        try {
            await firebase.firestore().collection("carts").doc(cartItems[0].id).delete();
            
          } catch (error) {
            console.error("Error removing item from cart: ", error);
          }
    };

    return (
        <div className="order-item">
            <div className="order-item__cover">
                <GameCover image={ game.image }/>
            </div>
            <div className="order-item__title">
                <span> { game.title } </span>
            </div>
            <div className="order-item__price">
                <span>{ game.price } руб.</span>
                <AiOutlineCloseCircle
                    size={25}
                    className="cart-item__delete-icon"
                    onClick={() => {
                        if (cartItems[0].id) {
                          deleteCartItem(cartItems[0].id)
                        }
                    }}
                />
            </div>
        </div>
    )
}
