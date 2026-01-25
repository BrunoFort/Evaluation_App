// src/features/evaluations/evaluationsStore.js

// Mock inicial
let evaluations = [
  {
    id: 1,
    employeeId: 1,
    employerId: 1,
    score: 88,
    starRating: 4,
    date: "2024-01-10",
    comments:
      "Consistent performer, good communication, and strong ownership of tasks.",
    referenceContact: "John Smith, HR Manager",

    qualityProductivity: 4,
    knowledgeSkills: 4,
    goalAchievement: 4,
    teamworkCollaboration: 5,
    initiativeProactivity: 4,
    selfManagement: 4,
    communicationRelationships: 5,
  },
  {
    id: 2,
    employeeId: 1,
    employerId: 2,
    score: 92,
    starRating: 5,
    date: "2024-03-05",
    comments:
      "Exceeded expectations in several projects and was a key contributor to the team.",
    referenceContact: "Sarah Lee, Engineering Lead",

    qualityProductivity: 5,
    knowledgeSkills: 5,
    goalAchievement: 5,
    teamworkCollaboration: 4,
    initiativeProactivity: 5,
    selfManagement: 5,
    communicationRelationships: 4,
  },
];

// ------------------------------------------------------
// GET — retorna todas as avaliações
// ------------------------------------------------------
export function getEvaluations() {
  return evaluations;
}

// ------------------------------------------------------
// ADD — adiciona uma nova avaliação
// ------------------------------------------------------
export function addEvaluation(newEval) {
  const nextId = evaluations.length
    ? Math.max(...evaluations.map((e) => e.id)) + 1
    : 1;

  const evaluation = { id: nextId, ...newEval };
  evaluations.push(evaluation);

  return evaluation;
}

// ------------------------------------------------------
// UPDATE — atualiza uma avaliação existente
// ------------------------------------------------------
export function updateEvaluation(id, updatedData) {
  const index = evaluations.findIndex((ev) => ev.id === Number(id));
  if (index === -1) return null;

  evaluations[index] = {
    ...evaluations[index],
    ...updatedData,
  };

  return evaluations[index];
}

// ------------------------------------------------------
// DELETE — remove uma avaliação existente
// ------------------------------------------------------
export function deleteEvaluation(id) {
  evaluations = evaluations.filter((ev) => ev.id !== Number(id));
  return true;
}
