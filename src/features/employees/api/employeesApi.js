const API_URL = "http://localhost:4000/employees";

async function handleResponse(res, errorMessage) {
  if (!res.ok) throw new Error(errorMessage);
  return res.json();
}

export async function getEmployees() {
  const res = await fetch(API_URL);
  return handleResponse(res, "Failed to fetch employees");
}

export async function getEmployeeById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res, "Employee not found");
}

export async function createEmployee(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "Failed to create employee");
}

export async function updateEmployee(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "Failed to update employee");
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return true;
}

