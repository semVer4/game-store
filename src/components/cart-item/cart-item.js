import React from "react";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../store/cart/reducer";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./cart-item.css";

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
