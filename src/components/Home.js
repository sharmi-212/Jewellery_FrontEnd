import React, { useState } from 'react';
import { Input } from '@mui/material';
import logo1 from "../images/Home_Bg.jpeg";
import './Home.css';
import About from "./About";
import Footer from "./Footer";

const Home = () => {
  

  return (
    <main>
      <div className="container">
        <div className="image-container">
          <img
            src="https://images.jdmagicbox.com//comp/service_catalogue/internet-website-designers-for-jewellery-022pxx22.xx22.200202012502.f7l3-vbgcibq.jpg"
            alt="Background"
            className="background-image"
          />
          <div className="text-overlay">
            <br></br><br></br>
            <h1 className="line1"style={{ marginRight: '30px' }}>                             Adorn yourself with elegance and grace</h1>
            <br></br>
            <br></br>
            
            <h2 className="line2"style={{ marginRight: '20px' }}>
        </h2>
          </div>
        </div>
       
      </div>
      <About/>
      <Footer/>
    </main>
  );
};

export default Home;
