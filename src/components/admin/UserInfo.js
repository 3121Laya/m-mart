import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserInfo = () => {
  const { id } = useParams(); // Get the user id from the URL
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details and order history from the server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`http://localhost:5000/users/${id}`);
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch order history
        const ordersResponse = await fetch(`http://localhost:5000/order-history?userId=${id}`);
        if (!ordersResponse.ok) {
          throw new Error('Error fetching order history');
        }
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally handle error, e.g., show a message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="container">
      <h2>User Details</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>ID:</strong> {user.id}</li>
        <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
        <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
        <li className="list-group-item"><strong>Role:</strong> {user.role}</li>
        {/* Add more user details as needed */}
      </ul>

      <h3>Order History</h3>
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
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};

export default UserInfo;
