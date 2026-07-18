import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Layout from "./components/layout/Layout";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...previousItems,
        {
          product: product,
          quantity: 1,
        },
      ];
    });
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((previousItems) => {
      const selectedItem = previousItems.find(
        (item) => item.product.id === productId,
      );

      if (selectedItem.quantity === 1) {
        return previousItems.filter(
          (item) => item.product.id !== productId,
        );
      }

      return previousItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }

  function handleRemoveItem(productId) {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.product.id !== productId),
    );
  }

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Layout>
      <h2>
        <Link to="/cart">Cart: {totalCartItems}</Link>
      </h2>

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onRemoveItem={handleRemoveItem}
            />
          }
        />

        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
