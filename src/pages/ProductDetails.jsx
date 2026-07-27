import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getProductById } from "../services/productService";
import { getImageUrl } from "../utils/imageUrl";
import useCart from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams();

  const { handleAddToCart } =
    useCart();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProductById(id);

      setProduct(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        {error}
      </p>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <p>
        <Link to="/">
          Back to Products
        </Link>
      </p>

      {product.imageUrl ? (
        <img
          src={getImageUrl(
            product.imageUrl,
          )}
          alt={product.name}
          width="300"
          height="300"
          style={{
            objectFit: "contain",
          }}
          onError={(event) => {
            event.currentTarget.style.display =
              "none";
          }}
        />
      ) : (
        <p>No image available</p>
      )}

      <h1>{product.name}</h1>

      {product.category && (
        <p>
          Category: {product.category}
        </p>
      )}

      {product.description && (
        <p>{product.description}</p>
      )}

      <p>Price: ₹{product.price}</p>

      <p>
        Stock: {product.stock}
      </p>

      <button
        type="button"
        disabled={product.stock <= 0}
        onClick={() =>
          handleAddToCart(product)
        }
      >
        {product.stock > 0
          ? "Add to Cart"
          : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductDetails;