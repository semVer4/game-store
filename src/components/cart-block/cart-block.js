import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { CartMenu } from "../cart-menu";
import { ItemsInCart } from "../items-in-cart";
import { calcTotalPrice } from '../utils';
import "./cart-block.css";
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

export const CartBlock = () => {
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);
  const items = useSelector((state) => state.cart.itemsInCart);
  const history = useHistory();
  const totalPrice = calcTotalPrice(items);

  const handleGoToOrderClick = useCallback(() => {
    setIsCartMenuVisible(false);
    history.push('/order');
  }, [history]);

  const handleClick = () => {
    history.push('/auth');
  };

  const handleClickAdm = () => {
    history.push('/admin');
  };

  return (
    <div className="cart-block">
      <ItemsInCart quantity={items.length}/>
      <BiCartAlt
        color="white"
        size={25}
        className="cart-icon"
        onClick={() => setIsCartMenuVisible(!isCartMenuVisible)}
      />
      <p onClick={handleClick}>SIGN</p>
      <p onClick={handleClickAdm}> _ADMIN</p>
      {totalPrice > 0 ? (
        <span className="total-price">{totalPrice} руб.</span>
      ) : null}
      {isCartMenuVisible && <CartMenu onClick={ handleGoToOrderClick }/>}
    </div>
  );
};
