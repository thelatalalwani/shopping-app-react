const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

async function request(
  endpoint,
  options = {},
) {
  const token =
    localStorage.getItem("token");

  const isFormData =
    options.body instanceof FormData;

  const headers = {
    ...options.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] =
      "application/json";
  }

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  let responseData = null;

  const contentType =
    response.headers.get(
      "content-type",
    );

  if (
    contentType?.includes(
      "application/json",
    )
  ) {
    responseData =
      await response.json();
  }

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem(
        "token",
      );

      localStorage.removeItem(
        "user",
      );
    }

    throw new Error(
      responseData?.message ||
        `Request failed with status ${response.status}`,
    );
  }

  return responseData;
}

function get(endpoint, options = {}) {
  return request(endpoint, {
    method: "GET",
    ...options,
  });
}

function post(
  endpoint,
  data,
  options = {},
) {
  return request(endpoint, {
    method: "POST",
    body:
      data instanceof FormData
        ? data
        : JSON.stringify(data),
    ...options,
  });
}

function put(
  endpoint,
  data,
  options = {},
) {
  return request(endpoint, {
    method: "PUT",
    body:
      data instanceof FormData
        ? data
        : JSON.stringify(data),
    ...options,
  });
}

function remove(
  endpoint,
  options = {},
) {
  return request(endpoint, {
    method: "DELETE",
    ...options,
  });
}

export const apiClient = {
  get,
  post,
  put,
  delete: remove,
};

export default apiClient;