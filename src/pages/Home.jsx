import { useMemo, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";

function Home() {
  const { handleAddToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortValue, setSortValue] = useState("");

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
    };
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    sortValue,
  ]);

  const { products, loading, error } =
    useProducts(filters);

  return (
    <div>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
      />

      <select
        value={category}
        onChange={(event) =>
          setCategory(event.target.value)
        }
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
        onChange={(event) =>
          setMinPrice(event.target.value)
        }
      />

      <input
        type="number"
        placeholder="Maximum price"
        min="0"
        value={maxPrice}
        onChange={(event) =>
          setMaxPrice(event.target.value)
        }
      />

      <select
        value={sortValue}
        onChange={(event) =>
          setSortValue(event.target.value)
        }
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

      <button
        type="button"
        onClick={() => {
          setSearch("");
          setCategory("");
          setMinPrice("");
          setMaxPrice("");
          setSortValue("");
        }}
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
        <div>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;