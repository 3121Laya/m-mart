import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const productsPerPage = 12;  // Adjusted to display 3 rows with 4 products per row

  const categories = ["men", "women","Bags","Mobile","Home","Watches","others"];

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

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNext = () => {
    if (indexOfLastProduct < filteredProducts.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="products-container mt-5">
      <h2 className="text-center mb-4">Products</h2>

      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 col-md-4">
          <h5 className="mb-3">Filter by Category</h5>
          {categories.map((category) => (
            <div key={category} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={category}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="form-check-label" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="col-lg-9 col-md-8">
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
              <p>Try adjusting your search or category filters.</p>
            </div>
          ) : (
            <div className="row">
              {currentProducts.map((product) => {
                const productImage = require(`../images/${product.image}.jpg`);

                return (
                  <div className="col-lg-3 col-md-6 mt-4" key={product.id}>
                    <div className="products card shadow-sm">
                      <img
                        src={productImage}
                        className="card-img-top product-image"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">₹{product.price}</p>
                        {/* <p className="card-text">₹{product.type}</p> */}
                        <Link to={`/products/${product.id}`} className="btn btn-danger">
                          View Details
                        </Link>
                      </div>
                    </div>
                    <br />
                  </div>
                );
              })}
            </div>
          )}

          <div className="pagination-buttons mt-4 d-flex justify-content-between">
            <button
              className="btn btn-success"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-success"
              on
              onClick={handleNext}
              disabled={indexOfLastProduct >= filteredProducts.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
