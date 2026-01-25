const API_URL = "http://localhost:4000/projects";

export async function getProjects() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Project not found");
  return res.json();
}

export async function createProject(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}
