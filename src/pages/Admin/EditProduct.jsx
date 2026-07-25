import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setApiError("");

      const data = await getProductById(id);

      setProduct({
        name: data.name ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        imageUrl: data.imageUrl ?? "",
        stock: data.stock ?? "",
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  }

  function validateProduct() {
    const validationErrors = {};

    if (product.name.trim() === "") {
      validationErrors.name =
        "Product name is required.";
    }

    if (
      product.price === "" ||
      Number(product.price) <= 0
    ) {
      validationErrors.price =
        "Price must be greater than zero.";
    }

    if (
      product.stock === "" ||
      Number(product.stock) < 0
    ) {
      validationErrors.stock =
        "Stock cannot be negative.";
    }

    return validationErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProduct();

    setErrors(validationErrors);
    setApiError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const request = {
      name: product.name.trim(),
      description:
        product.description.trim() || null,
      price: Number(product.price),
      imageUrl:
        product.imageUrl.trim() || null,
      stock: Number(product.stock),
    };

    try {
      setIsSubmitting(true);

      await updateProduct(id, request);

      navigate("/admin/products", {
        replace: true,
      });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <p>
        <Link to="/admin/products">
          Back to Products
        </Link>
      </p>

      {apiError && (
        <p style={{ color: "red" }}>
          {apiError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Product Name
          </label>

          <br />

          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p style={{ color: "red" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description">
            Description
          </label>

          <br />

          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">
            Price
          </label>

          <br />

          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={product.price}
            onChange={handleChange}
          />

          {errors.price && (
            <p style={{ color: "red" }}>
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="imageUrl">
            Image URL
          </label>

          <br />

          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/product.jpg"
          />
        </div>

        {product.imageUrl && (
          <div>
            <p>Image preview:</p>

            <img
              key={product.imageUrl}
              src={product.imageUrl}
              alt={product.name || "Product preview"}
              width="150"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div>
          <label htmlFor="stock">
            Stock
          </label>

          <br />

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={product.stock}
            onChange={handleChange}
          />

          {errors.stock && (
            <p style={{ color: "red" }}>
              {errors.stock}
            </p>
          )}
        </div>

        <br />

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Updating Product..."
            : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;