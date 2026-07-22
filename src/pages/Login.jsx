import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || "/";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);

      navigate(redirectPath, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
