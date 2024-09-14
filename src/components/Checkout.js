import React, { useContext, useState } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    clearCart(); // Clears the cart
    setOrderPlaced(true);
    setTimeout(() => {
      navigate('/products'); // Redirect after 2 seconds
    }, 2000); // Adjust timing as needed
  };
  

  return (
    <div className="checkout-container">
      {orderPlaced ? (
        <h2>Your order will arrive soon!</h2>
      ) : (
        <>
          <h2>Checkout</h2>
          <button onClick={handlePlaceOrder} className="btn btn-success">Place Order</button>
        </>
      )}
    </div>
  );
};

export default Checkout;
