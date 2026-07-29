import {
  lazy,
  Suspense,
} from "react";

import {
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const Home = lazy(
  () => import("./pages/Home"),
);

const ProductDetails = lazy(
  () => import("./pages/ProductDetails"),
);

const Login = lazy(
  () => import("./pages/Login"),
);

const Register = lazy(
  () => import("./pages/Register"),
);

const Cart = lazy(
  () => import("./pages/Cart"),
);

const Checkout = lazy(
  () => import("./pages/Checkout"),
);

const Orders = lazy(
  () => import("./pages/Orders"),
);

const AdminDashboard = lazy(
  () =>
    import(
      "./pages/admin/AdminDashboard"
    ),
);

const AdminProducts = lazy(
  () =>
    import(
      "./pages/admin/AdminProducts"
    ),
);

const AddProduct = lazy(
  () =>
    import(
      "./pages/admin/AddProduct"
    ),
);

const EditProduct = lazy(
  () =>
    import(
      "./pages/admin/EditProduct"
    ),
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <p>Loading page...</p>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products/:id"
            element={
              <ProductDetails />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;