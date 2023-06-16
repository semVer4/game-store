import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "../button";
import { CartItem } from "../cart-item";
import { calcTotalPrice } from "../utils";
import './cart-menu.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBPKNt_f3VogrYTIZdZh6gGSoukXJW0do",
  authDomain: "game-store-fa9d2.firebaseapp.com",
  databaseURL: "https://game-store-fa9d2-default-rtdb.firebaseio.com",
  projectId: "game-store-fa9d2",
  storageBucket: "game-store-fa9d2.appspot.com",
  messagingSenderId: "90832189644",
  appId: "1:90832189644:web:455d9c512535d56f8d6a69",
  measurementId: "G-PXDYFJ2XFD"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const CartMenu = ({ onClick, game }) => {
  const items = useSelector((state) => state.cart.itemsInCart);

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        loadCart(user);
      }
    });
  }, []);

  const loadCart = async (user) => {
    const unsubscribe = db
      .collection('cart')
      .where('id', '==', user.uid)
      .onSnapshot((snapshot) => {
        const items = snapshot.docs.map((doc) => doc.data());
        setCart(items);
      });

      return () => {
        unsubscribe();
    };
  };

  console.log(cart);
  return (
    <div className="cart-menu">
      <div className="cart-menu__games-list">
        {cart.length > 0 ? (
          <div>
            <Button type="primary" size="m" onClick={onClick}>
              Перейти в корзину
            </Button>
          </div>
          ) : (
            <p>Корзина пуста.</p>
          )}
      </div>
    </div>
  );
};
