// BooksCart.js

import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import './BookCart.css';

const BooksCart = (props) => {
  const { _id, name, description, stock, price, image, cart } = props.book;

  const [isInCart, setIsInCart] = useState(cart);

  // Function to toggle cart status
  const handleButtonClick = async () => {
    const newCartStatus = !isInCart;
    setIsInCart(newCartStatus);
    sendRequest(newCartStatus); // Pass the newCartStatus directly
  };

  const sendRequest = async (newCartStatus) => {
    await axios.put(`https://appliances-be.onrender.com/books/${_id}`, {
      name: String(name),
      description: String(description),
      price: Number(price),
      image: String(image),
      cart: newCartStatus,
      stock: Number(stock),
      available: true,
    }).then((res) => res.data);
  };

  return (
    <div className={`cart-card ${isInCart ? 'in-cart' : 'not-in-cart'}`}>
      <img src={image} alt={name} />

      <div className="cart-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <h3>Rs {price}</h3>
      </div>

      <Button
        variant="contained"
        onClick={handleButtonClick}
        disabled={!isInCart}
        className={isInCart ? 'remove-button' : 'add-button'}
      >
        {isInCart ? 'Remove from cart' : 'Add to cart'}
      </Button>
    </div>
  );
}

export default BooksCart;
