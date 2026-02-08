import { useEffect, useState } from "react";
import { supabase } from "/src/lib/supabaseClient";

export function usePublicEvaluation(token) {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      if (!token) {
        setEvaluations([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_detailed_evaluations",
        { token_input: token }
      );

      if (error) {
        setError("Evaluation not found or access denied.");
        setEvaluations([]);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setError("No evaluations found for this link.");
        setEvaluations([]);
        setLoading(false);
        return;
      }

      setEvaluations(data);
      setLoading(false);
    }

    load();
  }, [token]);

  return { evaluations, loading, error };
}
