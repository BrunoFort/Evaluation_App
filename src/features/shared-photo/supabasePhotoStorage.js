import { supabase } from "/src/lib/supabaseClient";

const BUCKET = "shine-assets";

function getFileExtension(file) {
  if (file?.name && file.name.includes(".")) {
    return file.name.split(".").pop().toLowerCase();
  }

  if (file?.type) {
    const parts = file.type.split("/");
    return parts[1] || "jpg";
  }

  return "jpg";
}

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function dataUrlToBlob(dataUrl) {
  if (!dataUrl) return null;
  const [header, base64] = dataUrl.split(",");
  const match = header.match(/data:(.*);base64/);
  const mime = match ? match[1] : "image/jpeg";
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

export async function uploadProfilePhoto({ userId, file, role = "employer" }) {
  if (!userId || !file) return null;

  const extension = getFileExtension(file);
  const safeName = sanitizeFileName(file?.name || `profile.${extension}`);
  const folder = role === "employee" ? "employee" : "employer";
  const path = `profile-photos/${folder}/${userId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { publicUrl: data?.publicUrl || null, path };
}

export async function deleteProfilePhoto(path) {
  if (!path) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

export async function loadAuthAvatar() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data?.user?.user_metadata || {};
}

export async function updateAuthAvatar({ url, path }) {
  const { error } = await supabase.auth.updateUser({
    data: {
      avatar_url: url || null,
      avatar_path: path || null,
    },
  });
  if (error) throw error;
}
