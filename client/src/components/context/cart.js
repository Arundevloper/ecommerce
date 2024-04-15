import { useState, useContext, createContext, useEffect } from "react";
const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { user: null, token: "" };
  });

useEffect(() => {
 localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);





  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
