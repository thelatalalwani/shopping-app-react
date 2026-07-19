import { useContext, useState } from "react";
import ProductCard from "../components/product/ProductCard";
import CartContext from "../context/CartContext";
import useProducts from "../hooks/useProducts";

function Home() {
    const { handleAddToCart } = useContext(CartContext);
    const { products, loading, error } = useProducts();

    const [searchText, setSearchText] = useState("");

    const filteredProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Products</h1>

            <input
                type="text"
                placeholder="Search products"
                value={searchText}
                onChange={(event) =>
                    setSearchText(event.target.value)
                }
            />

            <div>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;