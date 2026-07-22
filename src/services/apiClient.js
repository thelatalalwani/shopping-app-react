const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let responseData = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    responseData = await response.json();
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    throw new Error(
      responseData?.message || `Request failed with status ${response.status}`,
    );
  }

  return responseData;
}

function get(endpoint) {
  return request(endpoint, {
    method: "GET",
  });
}

function post(endpoint, data) {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

function put(endpoint, data) {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

function remove(endpoint) {
  return request(endpoint, {
    method: "DELETE",
  });
}

export const apiClient = {
  get,
  post,
  put,
  delete: remove,
};

export default apiClient;
