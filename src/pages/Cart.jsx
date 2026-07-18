function Cart({
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}) {
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

          <button onClick={() => onDecreaseQuantity(item.product.id)}>-</button>

          <span style={{ margin: "0 10px" }}>{item.quantity}</span>

          <button onClick={() => onIncreaseQuantity(item.product.id)}>+</button>

          <button onClick={() => onRemoveItem(item.product.id)}>Remove</button>

          <p>Subtotal: ₹{item.product.price * item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
