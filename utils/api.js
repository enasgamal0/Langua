import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.langua-learn.moltaqadev.com/client-api/v1/",
  headers: {
    Accept: "application/json",
    "api-key": "QVER63S8aTEhjdMTr5av8Y6EPBhEd6",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.href = "/auth/login";
    // }
    return Promise.reject(error);
  }
);

/**
 * Main API request function
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - API endpoint
 * @param {Object} body - Request payload
 * @param {Object} config - Axios config
 * @param {string|null} token - Bearer token
 * @param {string} locale - Language code
 * @returns {Promise<any>} - Axios response data
 */
export const apiRequest = async (
  method,
  url,
  body = null,
  config = {},
  token = null,
  locale = "en"
) => {
  try {
    const requestConfig = {
      method: method.toUpperCase(),
      url,
      headers: {
        ...config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        "Accept-Language": locale,
      },
      ...config,
    };

    if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      requestConfig.data = body;
    }

    if (body && ["GET", "DELETE"].includes(method.toUpperCase())) {
      requestConfig.params = body;
    }

    const response = await api(requestConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const get = (
  url,
  params = null,
  config = {},
  token = null,
  locale = "en"
) => apiRequest("GET", url, params, config, token, locale);

export const post = (
  url,
  body = null,
  config = {},
  token = null,
  locale = "en"
) => apiRequest("POST", url, body, config, token, locale);

export const put = (
  url,
  body = null,
  config = {},
  token = null,
  locale = "en"
) => apiRequest("PUT", url, body, config, token, locale);

export const patch = (
  url,
  body = null,
  config = {},
  token = null,
  locale = "en"
) => apiRequest("PATCH", url, body, config, token, locale);

export const del = (
  url,
  params = null,
  config = {},
  token = null,
  locale = "en"
) => apiRequest("DELETE", url, params, config, token, locale);

export default api;
