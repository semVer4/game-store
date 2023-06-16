import React from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../store/cart/reducer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./cart-item.css";
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

export const CartItem = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    dispatch(deleteItemFromCart(id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__price">
        <AiOutlineCloseCircle
          size={15}
          className="cart-item__delete-icon"
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};
