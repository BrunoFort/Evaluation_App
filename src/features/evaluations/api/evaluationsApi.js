const API_URL = "http://localhost:4000/evaluations";

export async function getEvaluations() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch evaluations");
  return res.json();
}

export async function getEvaluationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Evaluation not found");
  return res.json();
}

export async function createEvaluation(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create evaluation");
  return res.json();
}

export async function updateEvaluation(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update evaluation");
  return res.json();
}

export async function deleteEvaluation(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete evaluation");
  return true;
}
