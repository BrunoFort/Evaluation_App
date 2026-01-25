import { useEffect, useState } from "react";
import { getProjectById } from "../api/projectsApi";

export function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectById(id)
      .then(setProject)
      .finally(() => setLoading(false));
  }, [id]);

  return { project, loading };
}
