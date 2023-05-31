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

export const CartMenu = ({ onClick, game }) => {
  const items = useSelector((state) => state.cart.itemsInCart);

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

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);  

  const collectionRef = db.collection("carts");
  const deleteCartItem = () => {
    collectionRef
    .where("id", "==", '4e5aa808-805b-4c6f-9250-1c3f370f810e')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docRef = collectionRef.doc(doc.id);
        docRef.update({
          cart: firebase.firestore.FieldValue.delete()
        })
        .then(() => {
          console.log("Array successfully removed from Firestore!");
        })
        .catch((error) => {
          console.error("Error removing array from Firestore: ", error);
        });
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
  };

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

  console.log(cart);
  return (
    <div className="cart-menu">
      <div className="cart-menu__games-list">
        {cart.length > 0 ? (
          <div>
            <Button type="primary" size="m" onClick={onClick}>
              Оформить заказ
            </Button>
          </div>
          ) : (
            <p>Корзина пуста.</p>
          )}
      </div>
    </div>
  );
};
