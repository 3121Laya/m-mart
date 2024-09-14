import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id && item.quantity + amount > 0
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (selectedItems) => {
    const newOrder = {
      id: Date.now(),
      items: selectedItems,
      date: new Date().toLocaleString(),
    };

    setOrderHistory(prevHistory => [...prevHistory, newOrder]);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        totalPrice,
        placeOrder,
        orderHistory, // Expose orderHistory
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
