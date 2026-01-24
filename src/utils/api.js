const BASE_URL = "http://localhost:4000";

async function request(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export const api = {
  // GET
  get: (endpoint) => request(endpoint),

  // POST
  post: (endpoint, data) => request(endpoint, "POST", data),

  // PUT
  put: (endpoint, data) => request(endpoint, "PUT", data),

  // DELETE
  delete: (endpoint) => request(endpoint, "DELETE")
};
