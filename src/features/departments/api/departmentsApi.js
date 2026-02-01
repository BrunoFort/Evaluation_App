const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_URL = `${BASE_URL}/departments`;

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const message = `Request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
}

export function getDepartments() {
  return request(API_URL);
}

export function getDepartmentById(id) {
  return request(`${API_URL}/${id}`);
}

export function createDepartment(data) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateDepartment(id, data) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteDepartment(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}


