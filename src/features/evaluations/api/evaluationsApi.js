// src/features/evaluations/api/evaluationsApi.js

import { supabase } from "/src/lib/supabaseClient";

const TABLE = "evaluations";

function toEvaluation(row) {
  if (!row) return null;

  return {
    id: row.id,
    employeeId: row.employeeid ?? row.employeeId,
    employerId: row.employerid ?? row.employerId,
    title: row.title,
    createdAt: row.created_at ?? row.createdAt,
    status: row.status,
    publicToken: row.publicToken ?? row.public_token,
    criteria: row.scores ?? row.criteria,
    overallScore: row.overallScore ?? row.overall_score,
    score: row.score,
    starRating: row.starRating ?? row.star_rating,
    referenceContact: row.referenceContact ?? row.reference_contact,
    comments: row.comments,
    date: row.date,
    scores: row.scores,
  };
}

function toRow(data) {
  if (!data) return {};

  return {
    employeeid: data.employeeId ?? data.employeeid,
    employerid: data.employerId ?? data.employerid,
    title: data.title,
    status: data.status,
    publicToken: data.publicToken ?? data.public_token,
    scores: data.scores ?? data.criteria,
    overallScore: data.overallScore ?? data.overall_score,
    score: data.score,
    starRating: data.starRating ?? data.star_rating,
    referenceContact: data.referenceContact ?? data.reference_contact,
    comments: data.comments,
    date: data.date,
    created_at: data.createdAt ?? data.created_at,
  };
}

export async function getEvaluations(filters = {}) {
  let query = supabase.from(TABLE).select("*").order("created_at", {
    ascending: false,
  });

  if (filters.employeeId) {
    query = query.eq("employeeid", filters.employeeId);
  }

  if (filters.employerId) {
    query = query.eq("employerid", filters.employerId);
  }

  if (filters.publicToken) {
    query = query.eq("publicToken", filters.publicToken);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data || []).map(toEvaluation);
}

export async function getEvaluationById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message || "Evaluation not found");
  return toEvaluation(data);
}

export async function createEvaluation(data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .insert([toRow(data)])
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to create evaluation");
  return toEvaluation(result);
}

export async function updateEvaluation(id, data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .update(toRow(data))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to update evaluation");
  return toEvaluation(result);
}

export async function deleteEvaluation(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw new Error(error.message || "Failed to delete evaluation");
  return true;
}
