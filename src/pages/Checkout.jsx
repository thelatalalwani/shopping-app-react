import { useState } from "react";

function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <h1>Checkout</h1>

      <div>
        <label>Name</label>

        <br />

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <label>Email</label>

        <br />

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
    </div>
  );
}

export default Checkout;
