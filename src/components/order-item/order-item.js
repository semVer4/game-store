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

export const OrderItem = ({ game }) => {
    const dispatch = useDispatch();

    const deleteCartItem = async () => {
      try {
        const gameRef = db.collection('cart').where('productId', '==', game.productId);
        gameRef.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });                 
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
                    onClick={deleteCartItem}
                />
            </div>
        </div>
    )
}
