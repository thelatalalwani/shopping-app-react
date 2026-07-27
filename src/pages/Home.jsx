import {
  useCallback,
  useMemo,
  useState,
} from "react";
import ProductCard from "../components/product/ProductCard";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";

function Home() {

  
  const {
  handleAddToCart:
    addProductToCart,
} = useCart();

const handleAddToCart = useCallback(
  (product) => {
    addProductToCart(product);
  },
  [addProductToCart],
);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortValue, setSortValue] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filters = useMemo(() => {
    const [sortBy, sortDirection] =
      sortValue.split("-");

    return {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    };
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    sortValue,
    pageNumber,
    pageSize,
  ]);

  const {
    products,
    pagination,
    loading,
    error,
  } = useProducts(filters);

  function resetToFirstPage() {
    setPageNumber(1);
  }

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortValue("");
    setPageNumber(1);
    setPageSize(5);
  }

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          resetToFirstPage();
        }}
      />

      <select
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          resetToFirstPage();
        }}
      >
        <option value="">All Categories</option>
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

      <input
        type="number"
        placeholder="Minimum price"
        min="0"
        value={minPrice}
        onChange={(event) => {
          setMinPrice(event.target.value);
          resetToFirstPage();
        }}
      />

      <input
        type="number"
        placeholder="Maximum price"
        min="0"
        value={maxPrice}
        onChange={(event) => {
          setMaxPrice(event.target.value);
          resetToFirstPage();
        }}
      />

      <select
        value={sortValue}
        onChange={(event) => {
          setSortValue(event.target.value);
          resetToFirstPage();
        }}
      >
        <option value="">Default sorting</option>

        <option value="price-asc">
          Price: Low to High
        </option>

        <option value="price-desc">
          Price: High to Low
        </option>

        <option value="name-asc">
          Name: A to Z
        </option>

        <option value="name-desc">
          Name: Z to A
        </option>
      </select>

      <select
        value={pageSize}
        onChange={(event) => {
          setPageSize(Number(event.target.value));
          setPageNumber(1);
        }}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>

      <button
        type="button"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

      {loading && <p>Loading products...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        products.length === 0 && (
          <p>No products found.</p>
        )}

      {!loading && !error && (
        <>
          <div>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {pagination.totalItems > 0 && (
            <p>
              Page {pagination.pageNumber} of{" "}
              {pagination.totalPages} —{" "}
              {pagination.totalItems} products
            </p>
          )}

          {pagination.totalPages > 1 && (
            <div>
              <button
                type="button"
                disabled={
                  pagination.pageNumber === 1
                }
                onClick={() =>
                  setPageNumber(
                    (previousPage) =>
                      previousPage - 1,
                  )
                }
              >
                Previous
              </button>

              {Array.from(
                {
                  length:
                    pagination.totalPages,
                },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  disabled={
                    page ===
                    pagination.pageNumber
                  }
                  onClick={() =>
                    setPageNumber(page)
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={
                  pagination.pageNumber ===
                  pagination.totalPages
                }
                onClick={() =>
                  setPageNumber(
                    (previousPage) =>
                      previousPage + 1,
                  )
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;