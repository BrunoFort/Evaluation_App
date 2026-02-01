// src/features/employers/hooks/useDeleteEmployer.js

import { useState } from "react";
import { deleteEmployer } from "/src/features/employers/api/employersApi.js";

export function useDeleteEmployer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function remove(id) {
    try {
      setLoading(true);
      setError(null);

      const result = await deleteEmployer(id);
      return result;

    } catch (err) {
      setError(err.message || "Failed to delete employer");
      throw err;

    } finally {
      setLoading(false);
    }
  }

  return { remove, loading, error };
}
