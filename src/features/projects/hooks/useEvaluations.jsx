// src/features/evaluations/hooks/useEvaluations.js
import { useState, useEffect } from "react";

const MOCK_EVALUATIONS = [
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

export function useEvaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de fetch
    setTimeout(() => {
      setEvaluations(MOCK_EVALUATIONS);
      setLoading(false);
    }, 300);
  }, []);

  return { evaluations, loading };
}
