import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './ProductInfo.css';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [cartMessage, setCartMessage] = useState('');  // Cart message state

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);  // Set loading state to true before fetching
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
        setIsLoading(false);  // Set loading state to false after fetching
      } catch (error) {
        console.error("Error fetching product details", error);
        setIsLoading(false);  // Set loading state to false even if there's an error
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage('Added to Cart!');  // Set the cart message

    // Clear the message after 3 seconds
    setTimeout(() => {
      setCartMessage('');
    }, 3000);
  };

  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;  // Error handling for missing product
  }

  // Static image path from the public folder
  // const productImage = `/images/${product.image}`;
  const productImage = require(`../images/${product.image}.jpg`);

  return (
    <div className="product-section">
      <div className="product-info-container">
        <div className="product-image-container">
          <img
            src={productImage}
            alt={product.name}
            className="product-image"
            onError={(e) => { e.target.src = '/images/default.png'; }}  // Fallback image
          />
        </div>
        <div className="product-details-container">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-type">{product.type}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ₹{product.price}</p>
          <p className="product-rating">Rating: ★★★★☆ (4.5)</p>
          <div className="product-buttons">
            <button
              onClick={() => handleAddToCart(product)}  // Correct onClick handler
              className="btn btn-primary add-to-cart-btn"
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-secondary view-cart-btn">
              View Cart
            </Link>
          </div>
          {cartMessage && (
            <div className="cart-message">
              {cartMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
