import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch {
      setError("Unable to load product.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>₹ {product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default ProductDetails;
