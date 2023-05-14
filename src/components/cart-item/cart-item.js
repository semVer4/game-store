import React from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../store/cart/reducer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./cart-item.css";
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
