const API_URL = "http://localhost:4000/departments";

export async function getDepartments() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

export async function getDepartmentById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Department not found");
  return res.json();
}

export async function createDepartment(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create department");
  return res.json();
}

export async function updateDepartment(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update department");
  return res.json();
}

export async function deleteDepartment(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete department");
  return true;
}
