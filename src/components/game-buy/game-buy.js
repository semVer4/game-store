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
        loadCart(user);
      }
    });
  }, []);

  var productId = null;
  if (game) {
    productId = game.id;
  }

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

  const handleAddToCart = async () => {
    if (user) {
      db
      .collection('cart')
      .add({
        productId,
        id: user.uid,
        title: game.title,
        image: game.image,
        price: Number(game.price),
        video: game.video,
        description: game.description
      }); 
    } else {
      history.push('/auth');
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    //dispatch(setItemInCart(game));

    handleAddToCart();
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
