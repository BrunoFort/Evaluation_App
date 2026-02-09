import { supabase } from "/src/lib/supabaseClient";

const TABLE = "departments";

export async function getDepartments() {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function getDepartmentById(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message || "Department not found");
  return data;
}

export async function createDepartment(data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .insert([data])
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to create department");
  return result;
}

export async function updateDepartment(id, data) {
  const { data: result, error } = await supabase
    .from(TABLE)
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message || "Failed to update department");
  return result;
}

export async function deleteDepartment(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) throw new Error(error.message || "Failed to delete department");
  return true;
}


