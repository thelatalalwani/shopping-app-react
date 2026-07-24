import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { placeOrder } from "../services/orderService";

function Checkout() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = {};

    if (customer.name.trim() === "") {
      validationErrors.name = "Name is required.";
    }

    if (customer.email.trim() === "") {
      validationErrors.email = "Email is required.";
    }

    if (customer.phone.trim() === "") {
      validationErrors.phone = "Phone number is required.";
    }

    if (customer.address.trim() === "") {
      validationErrors.address = "Address is required.";
    }

    if (customer.city.trim() === "") {
      validationErrors.city = "City is required.";
    }

    if (customer.state.trim() === "") {
      validationErrors.state = "State is required.";
    }

    if (customer.pincode.trim() === "") {
      validationErrors.pincode = "Pincode is required.";
    }

    if (cartItems.length === 0) {
      validationErrors.cart =
        "Your cart is empty. Add a product before placing an order.";
    }

    setErrors(validationErrors);
    setApiError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const order = {
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,

      grandTotal: cartItems.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0,
      ),

      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      setIsSubmitting(true);

      await placeOrder(order);

      clearCart();

      alert("Order placed successfully!");

      navigate("/");
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Checkout</h1>

      {apiError && (
        <p style={{ color: "red" }}>
          {apiError}
        </p>
      )}

      {errors.cart && (
        <p style={{ color: "red" }}>
          {errors.cart}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <br />

          <input
            id="name"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p style={{ color: "red" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email</label>

          <br />

          <input
            id="email"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p style={{ color: "red" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>

          <br />

          <input
            id="phone"
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <p style={{ color: "red" }}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="address">Address</label>

          <br />

          <textarea
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
          />

          {errors.address && (
            <p style={{ color: "red" }}>
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city">City</label>

          <br />

          <input
            id="city"
            type="text"
            name="city"
            value={customer.city}
            onChange={handleChange}
          />

          {errors.city && (
            <p style={{ color: "red" }}>
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="state">State</label>

          <br />

          <input
            id="state"
            type="text"
            name="state"
            value={customer.state}
            onChange={handleChange}
          />

          {errors.state && (
            <p style={{ color: "red" }}>
              {errors.state}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pincode">Pincode</label>

          <br />

          <input
            id="pincode"
            type="text"
            name="pincode"
            value={customer.pincode}
            onChange={handleChange}
          />

          {errors.pincode && (
            <p style={{ color: "red" }}>
              {errors.pincode}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Placing Order..."
            : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;