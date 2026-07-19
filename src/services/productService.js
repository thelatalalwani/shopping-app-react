import apiClient from "./apiClient";

export function getProducts() {
  return apiClient.get("/Products");
}

export function getProductById(id) {
  return apiClient.get(`/Products/${id}`);
}
