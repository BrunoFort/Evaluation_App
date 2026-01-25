import { useEffect, useState } from "react";
import { getEmployers } from "../api/employersApi";

export function useEmployers() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployers()
      .then(setEmployers)
      .finally(() => setLoading(false));
  }, []);

  return { employers, loading };
}
