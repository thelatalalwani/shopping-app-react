import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, [filters]);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts(filters);

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;