import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  function handleViewDetails() {
    navigate(`/products/${product.id}`);
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "10px",
      }}
    >
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹ {product.price}</p>
      <p>Stock : {product.stock}</p>
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
}

export default ProductCard;
