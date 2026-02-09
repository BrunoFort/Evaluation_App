import { useEffect, useState } from "react";
import { supabase } from "/src/lib/supabaseClient";
import { getEvaluations } from "/src/features/evaluations/api/evaluationsApi.js";

function toNumber(value) {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function normalizeSummary(raw) {
  if (!raw) return null;

  const totalReviews =
    raw.total_reviews ?? raw.totalReviews ?? raw.total ?? raw.count ?? 0;
  const overallAvg =
    raw.overall_avg ?? raw.overallAvg ?? raw.avg ?? raw.average ?? null;
  const avgScore = raw.avg_score ?? raw.avgScore ?? raw.score_avg ?? null;
  const avgStars = raw.avg_stars ?? raw.avgStars ?? raw.stars_avg ?? null;

  return {
    totalReviews: toNumber(totalReviews) ?? 0,
    overallAvg: toNumber(overallAvg),
    avgScore: toNumber(avgScore),
    avgStars: toNumber(avgStars),
  };
}

function calculateFromEvaluations(evaluations) {
  if (!evaluations || evaluations.length === 0) return null;

  const scoreValues = evaluations
    .map((ev) => ev.overallScore ?? ev.overallscore ?? ev.score)
    .map(toNumber)
    .filter((value) => value !== null);

  const starValues = evaluations
    .map((ev) => ev.starRating)
    .map(toNumber)
    .filter((value) => value !== null);

  const totalReviews = evaluations.length;
  const avgScore =
    scoreValues.length > 0
      ? scoreValues.reduce((sum, value) => sum + value, 0) / scoreValues.length
      : null;
  const avgStars =
    starValues.length > 0
      ? starValues.reduce((sum, value) => sum + value, 0) / starValues.length
      : null;

  return {
    totalReviews,
    overallAvg: avgScore,
    avgScore,
    avgStars,
  };
}

export function useEmployeeConsolidated(employeeId) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!employeeId) {
        setSummary(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc(
        "get_employee_consolidated",
        {
          employee_id: employeeId,
        }
      );

      if (!rpcError && data && data.length > 0) {
        setSummary(normalizeSummary(data[0]));
        setLoading(false);
        return;
      }

      try {
        const evaluations = await getEvaluations({ employeeId });
        setSummary(calculateFromEvaluations(evaluations));
      } catch (err) {
        setError(err.message || "Failed to load consolidated data");
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [employeeId]);

  return { summary, loading, error };
}
