// ... (other imports)
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import "./BookUser.css";

const BookUser = (props) => {
  const { _id, name, idno, description, price, stock, available, image } = props.book;
  const navigate = useNavigate();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Function to add to cart button click event
  const handleButtonClick = async () => {
    if (Cookies.get("isLoggedIn") === "true") {
      await sendRequest();
      setIsAddedToCart(true);
    } else {
      navigate('/login');
    }
  };

  const sendRequest = async () => {
    await axios.put(`https://appliances-be.onrender.com/books/${_id}`, {
      name: String(name),
      idno: Number(idno),
      description: String(description),
      price: Number(price),
      image: String(image),
      cart: true,
      stock: Number(stock),
      available: false,
    }).then((res) => res.data);
  };

  return (
    <div className="card">
      <img src={image} alt={name} />

      <h3>{name}</h3>
      <p>{description}</p>
      <h2>Rs {price}</h2>
      <h3>Available : {String(available)}</h3>
      <Button
        disabled={!available || isAddedToCart}
        variant='contained'
        color='secondary'
        onClick={handleButtonClick}
      >
        {isAddedToCart ? 'Added to Cart' : 'Add to cart'}
      </Button>
    </div>
  );
}

export default BookUser;
