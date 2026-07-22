import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

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

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirmation password do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData);

      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Create Account</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
