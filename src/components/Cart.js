import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderHistoryContext } from "../context/OrderHistoryContext"; // Import OrderHistoryContext
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
  const { addOrder } = useContext(OrderHistoryContext); // Access order history context
  const { currentUser } = useAuth(); // Get currentUser from AuthContext
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      console.error("User not logged in");
      return;
    }

    const itemsToOrder = cartItems.filter(item => selectedItems.includes(item.id));
    if (itemsToOrder.length > 0) {
      try {
        // Place order using the updated addOrder function (correct argument order)
        await addOrder(itemsToOrder, currentUser.id); 
        itemsToOrder.forEach(item => removeFromCart(item.id)); // Remove ordered items from cart
        setOrderPlaced(true);
        setSelectedItems([]);  // Clear selected items after placing the order
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

  const handleGoToProducts = () => {
    navigate('/products');
  };

  const handleIncreaseQuantity = (item) => {
    updateCartQuantity(item.id, 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, -1);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(itemId => itemId !== id); // Deselect
      }
      return [...prevSelected, id]; // Select
    });
  };

  const Header = () => (
    <nav>
      <Link to="/cart">Cart</Link>
      <Link to="/order-history">Order History</Link>
    </nav>
  );

  return (
    <div className="cart-section">
      <h2>
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" /> Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button onClick={handleGoToProducts} className="btn btn-primary">
            Go to Products
          </button>
        </>
      ) : (
        <>
          {cartItems.map((item, index) => {
            const productImage = require(`../images/${item.image}.jpg`); // Dynamically import images based on item.image
            return (
              <div key={index} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
                <h3>{item.name}</h3>
                <img src={productImage} alt={item.name} className="cart-item-image" />
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item)} className="btn btn-secondary">-</button>
                  <button onClick={() => handleIncreaseQuantity(item)} className="btn btn-secondary">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                  Remove
                </button>
              </div>
            );
          })}
          <div className="cart-total">
            <h3>Total Price: ₹{totalPrice}</h3>
          </div>
          <button onClick={handlePlaceOrder} className="btn btn-success" disabled={selectedItems.length === 0}>
            Place Order for Selected Items
          </button>
        </>
      )}

      {orderPlaced && (
        <div className="order-confirmation">
          <h3>Your selected items have been placed!</h3>
          <p>Your order will arrive soon.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
