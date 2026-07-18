export async function placeOrder(order) {
  const response = await fetch("http://localhost:5220/api/Orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to place order.");
  }
}
