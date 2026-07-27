import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";

function ProductCard({
  product,
  onAddToCart,
}) {
  const navigate = useNavigate();

  function handleViewDetails() {
    navigate(`/products/${product.id}`);
  }

  function handleAddToCart() {
    onAddToCart(product);
  }

  return (
    <div>
      {product.imageUrl ? (
        <img
          src={getImageUrl(
            product.imageUrl,
          )}
          alt={product.name}
          width="180"
          height="180"
          loading="lazy"
          style={{
            objectFit: "contain",
          }}
        />
      ) : (
        <p>No image available</p>
      )}

      <h2>{product.name}</h2>

      {product.category && (
        <p>
          Category: {product.category}
        </p>
      )}

      <p>₹{product.price}</p>

      <p>
        {product.stock > 0
          ? `${product.stock} in stock`
          : "Out of stock"}
      </p>

      <button
        type="button"
        onClick={handleViewDetails}
      >
        View Details
      </button>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default memo(ProductCard);