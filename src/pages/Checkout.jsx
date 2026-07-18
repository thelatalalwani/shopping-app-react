import { useState } from "react";

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
    </div>
  );
}

export default Checkout;
