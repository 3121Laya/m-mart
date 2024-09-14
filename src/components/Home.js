import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';
import fashion1 from './fashion1.jpg';
import fashion2 from './fashion2.jpg';
import fashion3 from './fashion3.jpg';
import fashion4 from './fashion4.jpg';



import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsPerPage = 4;
  const images = [fashion1,fashion2];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(0, productsPerPage);

  const handleViewAll = () => {
    navigate('/products');
  };

  return (
    <div className="home-container">
      {/* Sliding Image Section */}
      <div className="sliding-image-container">
  
        <img src={images[currentIndex]} alt={`Fashion ${currentIndex + 1}`} className="sliding-image" />

        <div className="sliding-image-caption">
          <h1>50% OFF ON ALL PRODUCTS</h1>
          <h2>Discover Your Favorite Fashion</h2>
          <button className="products-button" onClick={handleViewAll}>
            Shop Now <FaArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
<br />
      {/* Products Section */}
      <div className="container mt-5"><br />
        <h2 className="text-center mb-4">Products</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProducts.length === 0 ? (
          <div className="no-results text-center">
            <h4>No results found</h4>
            <p>Try adjusting your search or browse our products.</p>
          </div>
        ) : (
          <div className="row">
            {currentProducts.map((product) => {
              const productImage = require(`../images/${product.image}.jpg`);
              return (
                <div className="col-md-3 col-sm-6 mb-4" key={product.id}>
                  <div className="card product-card">
                    <img
                      src={productImage}
                      className="card-img-top product-image"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">₹{product.price}</p>
                      <p className="card-text product-description">
                        {product.description || 'A great product at an affordable price!'}
                      </p>
                      <Link to={`/products/${product.id}`} className="btn btn-danger product-button">
                        View Details
                      </Link>
                    </div>
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pagination-buttons mt-4">
          <button className="btn btn-success" onClick={handleViewAll}>
            View All Products
          </button>
         
        </div>
        <br />
      </div>
    </div>
  );
};

export default Home;
