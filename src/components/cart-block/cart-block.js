import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { CartMenu } from "../cart-menu";
import { ItemsInCart } from "../items-in-cart";
import { calcTotalPrice } from '../utils';
import { auth } from "../../config/config";
import "./cart-block.css";

export const CartBlock = () => {
  const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);
  const items = useSelector((state) => state.cart.itemsInCart);
  const history = useHistory();
  const totalPrice = calcTotalPrice(items);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    });
  }, []);  

  const handleGoToOrderClick = useCallback(() => {
    setIsCartMenuVisible(false);
    history.push('/order');
  }, [history]);

  const handleClick = () => {
    history.push('/auth');
  };

  const handleGoToProfileClick = () => {
    history.push('/profile');
  };

  return (
    <div className="cart-block">
      <ItemsInCart quantity={items.length}/>

      {user ? <div>{user.email}</div> : <p>Авторизуйтесь</p>}

      <BiUser
        color="white"
        size={25}
        className="cart-icon"
        onClick={handleGoToProfileClick}
      />

      <BiCartAlt
        color="white"
        size={25}
        className="cart-icon"
        onClick={() => setIsCartMenuVisible(!isCartMenuVisible)}
      />
      <BiLogIn
        className="cart-icon"
        size={25}
        onClick={handleClick}
      />
      {totalPrice > 0 ? (
        <span className="total-price">{totalPrice} руб.</span>
      ) : null}
      {isCartMenuVisible && <CartMenu onClick={ handleGoToOrderClick } />}
    </div>
  );
};
