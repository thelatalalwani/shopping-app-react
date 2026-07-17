function Cart({ cartItems }) {
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

          <p>Quantity: {item.quantity}</p>

          <p>Subtotal: ₹{item.product.price * item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
