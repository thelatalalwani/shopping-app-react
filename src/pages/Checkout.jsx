import { useState } from "react";

function Checkout() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
  });

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <label>Name</label>

        <br />

        <input
          type="text"
          value={customer.name}
          onChange={(event) =>
            setCustomer({
              ...customer,
              name: event.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Email</label>

        <br />

        <input
          type="email"
          value={customer.email}
          onChange={(event) =>
            setCustomer({
              ...customer,
              email: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

export default Checkout;
