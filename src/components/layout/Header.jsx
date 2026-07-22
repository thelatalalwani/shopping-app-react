import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

function Header() {
  const { cartItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <h2>Shopping App</h2>

      <nav>
        <Link to="/">Home</Link>

        {" | "}

        <Link to="/cart">Cart ({cartCount})</Link>

        {isAuthenticated ? (
          <>
            {" | "}
            <span>Hello, {user?.name}</span>
            {" | "}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            {" | "}
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <hr />
    </header>
  );
}

export default Header;
