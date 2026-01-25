import { useEffect, useState } from "react";
import { getProjects } from "../api/projectsApi";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading };
}
