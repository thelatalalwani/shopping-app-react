import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(product) {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...previousItems,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleRemoveItem(productId) {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.product.id !== productId,
      ),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleRemoveItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;