// src/features/employers/api/employersApi.js

import { supabase } from "/src/lib/supabaseClient";

// GET all employers
export async function getEmployers() {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// GET employer by UUID
export async function getEmployerById(id) {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("uuid", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// CREATE employer
export async function createEmployer(data) {
  const { data: result, error } = await supabase
    .from("employers")
    .insert([data])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result;
}

// UPDATE employer
export async function updateEmployer(id, data) {
  const { data: result, error } = await supabase
    .from("employers")
    .update(data)
    .eq("uuid", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return result;
}

// DELETE employer
export async function deleteEmployer(id) {
  const { error } = await supabase
    .from("employers")
    .delete()
    .eq("uuid", id);

  if (error) throw new Error(error.message);
  return true;
}

