import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h2>Shopping App</h2>

      <nav>
        <Link to="/">Home</Link>

        {" | "}

        <Link to="/cart">Cart</Link>
      </nav>

      <hr />
    </header>
  );
}

export default Header;
