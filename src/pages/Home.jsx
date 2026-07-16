import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Shopping App</h1>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;
