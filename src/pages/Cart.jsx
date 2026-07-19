import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
  } = useCart();

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.product.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.product.name}</h3>

          <p>Price: ₹{item.product.price}</p>

          <button onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>

          <span style={{ margin: "0 10px" }}>{item.quantity}</span>

          <button onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>

          <button onClick={() => handleRemoveItem(item.product.id)}>Remove</button>

          <p>Subtotal: ₹{item.product.price * item.quantity}</p>
        </div>
      ))}

      <hr />

      <h2>Grand Total: ₹{grandTotal}</h2>

      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
}

export default Cart;
