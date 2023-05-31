import React from "react";
import { Link } from "react-router-dom";
import { CartBlock } from "../cart-block";
import "./header.css";

export const Header = () => {
  const handleKidsClick = () => {
  };

  return (
    <div className="header">
      <div className="wrapper">
        <Link to="/" className="header__store-title">
          <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Link>
        <ul>
          <li onClick={handleKidsClick}>Детские игры</li>
          <li>Обучающие игры</li>
          <li>Развлекательные игры</li>
          <li>Бесплатные игры</li>
        </ul>
      </div>
      <div className="wrapper header__cart-btn-wrapper">
        <CartBlock />
      </div>
    </div>
  );
};
