import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { setItemInCart, deleteItemFromCart } from "../../store/cart/reducer";
import "./game-buy.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc } from "firebase/firestore";

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

export const GameBuy = ({ game }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.itemsInCart);
  const isItemInCart = items.some((item) => item.id === game.id);

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        // Если пользователь авторизован, загрузите его корзину из базы данных
        loadCart();
      }
    });
  }, []);

  const handleAddToCart = async (cart) => {
    if (user) {
      db.collection('users').doc(user.uid).collection('cart').add({
        cart: cart
      })
        .then(() => {
          setCart([cart, cart]);
          console.log('Товар добавлен в корзину.');
        })
        .catch((error) => {
          console.error('Ошибка при добавлении товара в корзину:', error);
        });
    } else {
      history.push('/auth');
    }
  };

  const loadCart = async () => {
    if (user) {
      const unsubscribe = db
        .doc(user.uid)
        .collection('carts')
        .onSnapshot((snapshot) => {
          const items = snapshot.docs.map((doc) => doc.data());
          setCart(items);
        });

      return () => {
        unsubscribe();
      };
    }
  };  

  const handleClick = (e) => {
    e.stopPropagation();
    //dispatch(setItemInCart(game));

    handleAddToCart(game);
  };

  return (
    <div className="game-buy">
      <span className="game-buy__price">{game.price} руб.</span>
      <Button
        type={isItemInCart ? "secondary" : "primary" }
        onClick={handleClick}
      >
        {isItemInCart ? "В корзине" : "В Корзину"}
      </Button>
    </div>
  );
};
