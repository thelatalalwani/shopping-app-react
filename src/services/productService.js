import apiClient from "./apiClient";

export function getProducts() {
  return apiClient.get("/Products");
}

export function getProductById(id) {
  return apiClient.get(`/Products/${id}`);
}

export function createProduct(product) {
  return apiClient.post("/Products", product);
}

export function updateProduct(id, product) {
  return apiClient.put(`/Products/${id}`, product);
}

export function deleteProduct(id) {
  return apiClient.delete(`/Products/${id}`);
}