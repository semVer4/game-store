import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "../button";
import './cart-menu.css';
import { auth, db } from "../../config/config";

export const CartMenu = ({ onClick, game }) => {
  const items = useSelector((state) => state.cart.itemsInCart);

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);  

  useEffect(() => {
    auth.onAuthStateChanged(user => {
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
