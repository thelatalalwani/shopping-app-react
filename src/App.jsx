import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingProduct = previousItems.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return previousItems;
      }

      return [...previousItems, product];
    });
  }

  return (
    <>
      <h2>Cart: {cartItems.length}</h2>

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
