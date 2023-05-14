import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../button";
import { setItemInCart, deleteItemFromCart } from "../../store/cart/reducer";
import "./game-buy.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory } from 'react-router-dom';

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
        loadCart(user.uid);
      }
    });
  }, []);

  const handleAddToCart = (product) => {
    if (user) {
      const newCart = [...cart, product];
      db.collection('carts').doc(user.uid).set({ cart: newCart });
      setCart(newCart);
    } else {
      history.push('/auth');
    }
  };

  const loadCart = async (userId) => {
    const snapshot = await db.collection('carts').doc(userId).get();
    if (snapshot.exists) {
      setCart(snapshot.data().cart);
    } else {
      setCart([]);
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
        {isItemInCart ? "Убрать из корзины" : "В Корзину"}
      </Button>
    </div>
  );
};
