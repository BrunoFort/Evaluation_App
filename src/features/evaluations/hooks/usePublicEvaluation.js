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
        setError("invalid");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_detailed_evaluations",
        { token_input: token }
      );

      if (error) {
        setError("invalid");
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        const { data: link } = await supabase
          .from("evaluation_links")
          .select("expires_at")
          .eq("token", token)
          .maybeSingle();

        if (!link) {
          setError("invalid");
        } else if (new Date(link.expires_at) < new Date()) {
          setError("expired");
        } else {
          setError("invalid");
        }

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
