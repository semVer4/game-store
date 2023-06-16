import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartBlock } from "../cart-block";
import { BiHome } from "react-icons/bi";
import { auth, db } from "../../config/config";
import { useHistory } from 'react-router-dom';
import "./header.css";

export const Header = () => {
  const history = useHistory();

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        loadBalance(user);
      }
    });
  }, []);

  const loadBalance = async (user) => {
    const snapshot = await db.collection('users').doc(user.uid).get();
      
    if (snapshot.exists) {
      setBalance(snapshot.data().balance);
    }
  };  

  const addBalance = async () => {
    if (user) {
      history.push('/profile');
    } else {
      history.push('/auth');
    }
  };

  return (
    <div className="header">
      <div className="wrapper">
        <Link to="/home" className="header__store-title">
          {/* <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
            <BiHome
              color="white"
              size={25}
              className="cart-icon"
            />
        </Link>
        <div className="userMenu">
          <div>&nbsp;&nbsp;&nbsp;Мой баланс: &nbsp;&nbsp;
            {user ? <span className="styleBalance">{balance}</span> : <span className="styleBalance">0</span>}&nbsp;&nbsp;руб.&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn--primary" onClick={addBalance}>пополнить баланс</button></div>
          </div>
      </div>
      <div className="wrapper header__cart-btn-wrapper">
        <CartBlock />
      </div>
    </div>
  );
};
