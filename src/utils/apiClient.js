export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, config);
    if (response.status === 204) return null;

    const data = await response.json().catch(() => ({}));

    if (response.ok) return data;

    const error = new Error(data.message || response.statusText || "An error occurred");
    error.status = response.status;
    throw error;
  } catch (err) {
    if (!err.status) {
      err.message = "Network error. Please check your connection.";
    }
    throw err;
  }
}