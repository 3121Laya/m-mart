import React, { useState, useEffect } from 'react';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');

  // Fetch all products from json-server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    // Filter products based on selected category
    const filtered = products.filter(product => product.category === selectedCategory);
    setFilteredProducts(filtered);
  };

  return (
    <div className="container">
      <h2>Product Details</h2>

      {/* Category selection dropdown */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Select Category</label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="form-select"
        >
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      {/* Products table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={`/images/${product.image}.jpg`}
                    alt={product.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No products found for this category</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
