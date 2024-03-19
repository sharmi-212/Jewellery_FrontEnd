import React from "react";
import './About.css'; // Import the CSS file

const About = () => {
    const containerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
      };
    
      const leftColumnStyles = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      };
    
      const headingStyles = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        lineHeight: '1.125',
        color: '#333',
        paddingBottom: '1rem',
      };
    
      const paragraphStyles = {
        fontSize: '20px',
        lineHeight: '1.5',
        color: '#666',
      };
    
      const imageStyles = {
        width: '70%',
        height: 'auto',
        marginLeft: '60px',
      };
  return (
    <div className="container mx-auto py-16 px-20 md:py-12 md:px-6 py-9 px-4">
      <br />
      <br />
      <p style={{ fontSize: "40px" }} className="text-bblue">
        <b>Indulge in Elegance from the Comfort of Home</b>
      </p>



      {/* <img
          style={imageStyles}
          src="https://herjewellery.com/cdn/shop/files/Promotional_Banners.jpg?v=1686125531&width=3840"
          alt="A group of Products"
        /> */}
      
      <br />
      <div style={containerStyles}>
      <div style={leftColumnStyles}>
        <h1 style={headingStyles}>About Us</h1>
        <p style={paragraphStyles}>
        Crafting Elegance Since 2020. Our mission is to offer exquisite craftsmanship and superior quality. Our collection spans from dazzling jewelry pieces to luxurious accessories. We take pride in providing unparalleled value, ensuring each piece reflects timeless beauty and unmatched craftsmanship. At Santhi Jewellers, we uphold stringent quality standards and prioritize customer satisfaction above all else
        </p>
        <br />
        <h3>
          <b style={{ color:'black', }}>Embrace Ease in Every Moment</b>
        </h3>
      </div>
      <div>
        <img
          style={imageStyles}
          src="https://media.istockphoto.com/id/489814272/photo/gold-silver-rings-and-chains.jpg?s=612x612&w=0&k=20&c=d8tGqzlmqMZzhcYmgE_OyDNSQ9dAdo-T3BwdaSsDbhs="
          alt="A group of Products"
        />
      </div>
    </div>
      <br />
      <br />

     

    
      <center>
       
      </center>
    </div>
  );
};

export default About;
