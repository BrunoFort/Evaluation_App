// src/features/employers/hooks/useUpdateEmployer.js

import { useState } from "react";
import { updateEmployer } from "/src/features/employers/api/employersApi.js";

export function useUpdateEmployer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function update(id, data) {
    try {
      setLoading(true);
      setError(null);

      const result = await updateEmployer(id, data);
      return result;

    } catch (err) {
      setError(err.message || "Failed to update employer");
      throw err;

    } finally {
      setLoading(false);
    }
  }

  return { update, loading, error };
}
