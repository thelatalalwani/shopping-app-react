import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome, {user?.name}.
      </p>

      <h2>Product Management</h2>

      <div>
        <Link to="/admin/products">
          Manage Products
        </Link>
      </div>

      <div>
        <Link to="/admin/products/add">
          Add Product
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;