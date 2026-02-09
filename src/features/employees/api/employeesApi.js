import { supabase } from "/src/lib/supabaseClient";

const TABLE = "employees";

export async function getEmployees() {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getEmployeeById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message || "Employee not found");
  return data;
}

export async function createEmployee(data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to create employee");
  return result;
}

export async function updateEmployee(id, data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to update employee");
  return result;
}

export async function deleteEmployee(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw new Error(error.message || "Failed to delete employee");
  return true;
}

