import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  });

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

      setProducts(data.items);

      setPagination({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    products,
    pagination,
    loading,
    error,
  };
}

export default useProducts;