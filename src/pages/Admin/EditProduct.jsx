import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

import { getImageUrl } from "../../utils/imageUrl";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  const [imageFile, setImageFile] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const [apiError, setApiError] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const imagePreviewUrl = useMemo(() => {
    if (!imageFile) {
      return "";
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(
          imagePreviewUrl,
        );
      }
    };
  }, [imagePreviewUrl]);

  async function loadProduct() {
    try {
      setIsLoading(true);
      setApiError("");

      const data =
        await getProductById(id);

      setProduct({
        name: data.name ?? "",
        description:
          data.description ?? "",
        category: data.category ?? "",
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
    const { name, value } =
      event.target;

    setProduct(
      (previousProduct) => ({
        ...previousProduct,
        [name]: value,
      }),
    );
  }

  function handleImageChange(event) {
    const selectedFile =
      event.target.files?.[0] ||
      null;

    setImageFile(selectedFile);
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

    if (
      imageFile &&
      imageFile.size >
        5 * 1024 * 1024
    ) {
      validationErrors.imageFile =
        "Image size cannot exceed 5 MB.";
    }

    return validationErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateProduct();

    setErrors(validationErrors);
    setApiError("");

    if (
      Object.keys(
        validationErrors,
      ).length > 0
    ) {
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "name",
      product.name.trim(),
    );

    formData.append(
      "description",
      product.description.trim(),
    );

    formData.append(
      "category",
      product.category.trim(),
    );

    formData.append(
      "price",
      product.price,
    );

    formData.append(
      "stock",
      product.stock,
    );

    if (product.imageUrl?.trim()) {
      formData.append(
        "imageUrl",
        product.imageUrl.trim(),
      );
    }

    if (imageFile) {
      formData.append(
        "imageFile",
        imageFile,
      );
    }

    try {
      setIsSubmitting(true);

      await updateProduct(
        id,
        formData,
      );

      navigate(
        "/admin/products",
        {
          replace: true,
        },
      );
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <p>Loading product...</p>
    );
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
            <p
              style={{ color: "red" }}
            >
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
            value={
              product.description
            }
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category">
            Category
          </label>

          <br />

          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">
              Select Category
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Books">
              Books
            </option>
          </select>
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
            <p
              style={{ color: "red" }}
            >
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
            type="text"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Optional image URL"
          />
        </div>

        <div>
          <label htmlFor="imageFile">
            Replace Product Image
          </label>

          <br />

          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={
              handleImageChange
            }
          />

          <p>
            Leave this empty to keep
            the existing image.
          </p>

          {errors.imageFile && (
            <p
              style={{ color: "red" }}
            >
              {errors.imageFile}
            </p>
          )}
        </div>

        {product.imageUrl &&
          !imageFile && (
            <div>
              <p>Current image:</p>

              <img
                src={getImageUrl(
                  product.imageUrl,
                )}
                alt={product.name}
                width="150"
                height="150"
                style={{
                  objectFit:
                    "contain",
                }}
                onError={(event) => {
                  event.currentTarget
                    .style.display =
                    "none";
                }}
              />
            </div>
          )}

        {imageFile && (
          <div>
            <p>
              New selected image:
            </p>

            <img
              src={imagePreviewUrl}
              alt="New product preview"
              width="150"
              height="150"
              style={{
                objectFit: "contain",
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
            <p
              style={{ color: "red" }}
            >
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