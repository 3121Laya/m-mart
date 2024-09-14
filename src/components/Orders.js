import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the auth context

const Orders = () => {
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

    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/order-history?userId=${currentUser.id}`);
        if (!response.ok) {
          throw new Error('Error fetching orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Total Quantity</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              // Check if the order has the correct structure
              let items = [];
              let totalPrice = 0;

              // Handle cases where items are in array format
              if (Array.isArray(order.items)) {
                items = order.items;
                totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              } 
              // Handle cases where items are in the nested object format
              else if (order.items && Array.isArray(order.items.items)) {
                items = order.items.items;
                totalPrice = order.items.totalPrice || items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              }

              const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>
                    <ul>
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.name} (₹{item.price} x {item.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{totalQuantity}</td>
                  <td>₹{totalPrice}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
