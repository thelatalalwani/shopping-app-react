import apiClient from "./apiClient";

export function getProducts(
  filters = {},
  signal,
) {
  const query =
    new URLSearchParams();

  Object.entries(filters).forEach(
    ([key, value]) => {
      if (
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        query.append(key, value);
      }
    },
  );

  const queryString =
    query.toString();

  return apiClient.get(
    `/Products${
      queryString
        ? `?${queryString}`
        : ""
    }`,
    {
      signal,
    },
  );
}

export function getProductById(
  id,
  signal,
) {
  return apiClient.get(
    `/Products/${id}`,
    {
      signal,
    },
  );
}

export function createProduct(
  product,
) {
  return apiClient.post(
    "/Products",
    product,
  );
}

export function updateProduct(
  id,
  product,
) {
  return apiClient.put(
    `/Products/${id}`,
    product,
  );
}

export function deleteProduct(id) {
  return apiClient.delete(
    `/Products/${id}`,
  );
}