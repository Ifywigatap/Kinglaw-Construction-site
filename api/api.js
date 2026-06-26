const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

/**
 * A generic API client for making fetch requests.
 * @param {string} endpoint The API endpoint to call.
 * @param {object} options Custom fetch options.
 * @returns {Promise<any>} The JSON response from the API.
 */
async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiBaseUrl}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Handle cases where error response is not JSON
    throw new Error(errorData.message || `An error occurred: ${response.statusText}`);
  }

  // Handle cases where response might not have a body (e.g., 204 No Content)
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Authentication-specific API functions
export const apiLogin = (credentials) => apiClient('/api/auth/login', { body: credentials });
export const apiRegister = (credentials) => apiClient('/api/auth/register', { body: credentials });
export const apiVerifyToken = (token) => apiClient('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });