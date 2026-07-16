import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      console.log("Products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Shopping App</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>₹ {product.price}</p>
          <p>Stock : {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;