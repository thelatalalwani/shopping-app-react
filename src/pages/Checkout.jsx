import { useState } from "react";

function Checkout() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
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
      </div>
    </div>
  );
}

export default Checkout;
