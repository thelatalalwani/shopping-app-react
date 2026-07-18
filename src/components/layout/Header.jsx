import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

function Header() {
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header>
      <h2>Shopping App</h2>

      <nav>
        <Link to="/">Home</Link>

        {" | "}

        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>

      <hr />
    </header>
  );
}

export default Header;
