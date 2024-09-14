import React, { createContext, useState } from "react";

export const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = async (orderItems, userId) => {
    try {
      // Calculate total price based on ordered items
      const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

      // Construct new order in the desired structure
      const newOrder = {
        id: Math.random().toString(36).substr(2, 9), // Randomly generated ID for the order
        items: {
          userId,
          items: orderItems,   // Array of ordered items
          totalPrice,          // Total price of the items
          date: new Date().toISOString(), // Order date
        },
        date: new Date().toISOString() // External date for the order structure
      };

      // Send the order data to the backend
      const response = await fetch('http://localhost:5000/order-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // Update the orders state with the new order added
      setOrders((prevOrders) => [...prevOrders, data]);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ addOrder, orders }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
