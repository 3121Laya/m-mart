import React, { useState, useEffect } from 'react';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all'); // Default to 'all'

  // Fetch all products from json-server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially display all products
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

    // Filter products based on selected category or display all if 'all' is selected
    if (selectedCategory === 'all') {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await fetch(`http://localhost:5000/products/${id}`, {
          method: 'DELETE'
        });
        // Remove the deleted product from state
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle edit (redirect to an edit page or modal)
  const handleEdit = (id) => {
    // Redirect to an edit form or open a modal
    // You can navigate to an edit page like `/edit-product/${id}`
    alert(`Redirect to edit form for product ID: ${id}`);
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
          <option value="all">Select All</option>
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
            <th>Actions</th> {/* New column for actions */}
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
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No products found for this category</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
