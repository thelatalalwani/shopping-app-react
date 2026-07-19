import apiClient from "./apiClient";

export function placeOrder(order) {
  return apiClient.post("/Orders", order);
}
