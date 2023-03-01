import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, deleteCartItems }) => {
  return (
    <>
    <div className="CartItemCard">
      <img src="https://bucketforada.s3.ap-south-1.amazonaws.com/uploads/all/3V5PrLFtsY9TqSeekXcv2jZpszEwXWWaLRF4TSvz.png" alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
    </>
  );
};

export default CartItem;