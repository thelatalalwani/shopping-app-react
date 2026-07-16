function ProductCard({ product }) {
  return (
    <div
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
  );
}

export default ProductCard;
