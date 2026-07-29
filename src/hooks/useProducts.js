import {
  useEffect,
  useState,
} from "react";

import { getProducts } from "../services/productService";

function useProducts(filters) {
  const [products, setProducts] =
    useState([]);

  const [pagination, setPagination] =
    useState({
      pageNumber: 1,
      pageSize: 5,
      totalItems: 0,
      totalPages: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const abortController =
      new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProducts(
            filters,
            abortController.signal,
          );

        setProducts(data.items);

        setPagination({
          pageNumber:
            data.pageNumber,
          pageSize:
            data.pageSize,
          totalItems:
            data.totalItems,
          totalPages:
            data.totalPages,
        });
      } catch (error) {
        if (
          error.name ===
          "AbortError"
        ) {
          return;
        }

        setError(error.message);
      } finally {
        if (
          !abortController
            .signal.aborted
        ) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      abortController.abort();
    };
  }, [filters]);

  return {
    products,
    pagination,
    loading,
    error,
  };
}

export default useProducts;