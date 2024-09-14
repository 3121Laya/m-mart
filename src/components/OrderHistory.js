import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { currentUser } = useAuth(); // Get the current user from the auth context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      // Handle case where no user is logged in
      console.error('No user logged in');
      setLoading(false);
      return;
    }

    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order-history?userId=${currentUser.id}`);
        if (!response.ok) {
          throw new Error('Error fetching order history');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Your Order History</h2>
      {orders.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>₹{order.price * order.quantity}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
