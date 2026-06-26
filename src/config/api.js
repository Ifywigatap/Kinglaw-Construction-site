// Use relative /api for serverless functions on the same domain (Vercel/Netlify)
// In development, this will point to your local dev server's API proxy
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const endpoints = {
  contact: `${API_BASE_URL}/contact`,
  inquiry: `${API_BASE_URL}/inquiry`,
  newsletter: `${API_BASE_URL}/subscribe`,
  quote: `${API_BASE_URL}/quote`,
};

export const integrations = {
  googleMaps: "https://maps.googleapis.com/maps/api/js",
};

export default {
  API_BASE_URL,
  endpoints,
  integrations,
};