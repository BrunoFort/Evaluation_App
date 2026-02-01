// src/features/employers/hooks/useCreateEmployer.js

import { useState } from "react";
import { createEmployer } from "/src/features/employers/api/employersApi.js";

export function useCreateEmployer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function create(data) {
    try {
      setLoading(true);
      setError(null);

      const result = await createEmployer(data);
      return result;

    } catch (err) {
      setError(err.message || "Failed to create employer");
      throw err;

    } finally {
      setLoading(false);
    }
  }

  return { create, loading, error };
}
