import { useState } from "react";
import { placeOrder } from "../services/orderService";

function Checkout({ cartItems }) {
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

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const validationErrors = {};

    if (customer.name.trim() === "") {
      validationErrors.name = "Name is required.";
    }

    if (customer.email.trim() === "") {
      validationErrors.email = "Email is required.";
    }

    setErrors(validationErrors);

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
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),

      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    await placeOrder(order);

    alert("Order Placed Successfully!");
  }

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <label>Name</label>

        <br />

        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
        />

        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Email</label>

        <br />

        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
        />

        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label>Phone</label>

        <br />

        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Address</label>

        <br />

        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>City</label>

        <br />

        <input
          type="text"
          name="city"
          value={customer.city}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>State</label>

        <br />

        <input
          type="text"
          name="state"
          value={customer.state}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Pincode</label>

        <br />

        <input
          type="text"
          name="pincode"
          value={customer.pincode}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
}

export default Checkout;
