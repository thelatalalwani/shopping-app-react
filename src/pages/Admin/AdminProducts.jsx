import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  deleteProduct,
  getProducts,
} from "../../services/productService";

import { getImageUrl } from "../../utils/imageUrl";

function AdminProducts() {
  const [products, setProducts] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [
    deletingProductId,
    setDeletingProductId,
  ] = useState(null);

  const [error, setError] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getProducts({
        pageNumber: 1,
        pageSize: 50,
      });

      setProducts(data.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(product) {
    const shouldDelete =
      window.confirm(
        `Are you sure you want to delete "${product.name}"?`,
      );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");
      setSuccessMessage("");
      setDeletingProductId(product.id);

      await deleteProduct(product.id);

      setProducts(
        (previousProducts) =>
          previousProducts.filter(
            (currentProduct) =>
              currentProduct.id !==
              product.id,
          ),
      );

      setSuccessMessage(
        `"${product.name}" was deleted successfully.`,
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingProductId(null);
    }
  }

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h1>Manage Products</h1>

      <p>
        <Link to="/admin/products/add">
          Add Product
        </Link>
      </p>

      {successMessage && (
        <p style={{ color: "green" }}>
          {successMessage}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.imageUrl ? (
                    <img
                      src={getImageUrl(
                        product.imageUrl,
                      )}
                      alt={product.name}
                      width="70"
                      height="70"
                      loading="lazy"
                      style={{
                        objectFit: "contain",
                      }}
                      onError={(event) => {
                        event.currentTarget
                          .style.display =
                          "none";
                      }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>

                <td>{product.name}</td>

                <td>
                  {product.category ||
                    "Not specified"}
                </td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>
                  <Link
                    to={`/admin/products/edit/${product.id}`}
                  >
                    Edit
                  </Link>

                  {" | "}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(product)
                    }
                    disabled={
                      deletingProductId ===
                      product.id
                    }
                  >
                    {deletingProductId ===
                    product.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProducts;