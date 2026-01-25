const API_URL = "http://localhost:4000/employers";

export async function getEmployers() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch employers");
  return res.json();
}

export async function getEmployerById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Employer not found");
  return res.json();
}

export async function createEmployer(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create employer");
  return res.json();
}

export async function updateEmployer(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employer");
  return res.json();
}

export async function deleteEmployer(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employer");
  return true;
}
