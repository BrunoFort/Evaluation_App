import { supabase } from "/src/lib/supabaseClient";

const BUCKET = "shime-assets";

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
  console.log("🖼️ dataUrlToBlob - input length:", dataUrl?.length);
  if (!dataUrl) {
    console.warn("⚠️ dataUrlToBlob called with null/undefined");
    return null;
  }
  
  try {
    const [header, base64] = dataUrl.split(",");
    console.log("🖼️ header:", header?.slice?.(0, 50));
    const match = header.match(/data:(.*);base64/);
    const mime = match ? match[1] : "image/jpeg";
    console.log("🖼️ mime type:", mime);
    
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mime });
    console.log("✅ Blob created successfully -", blob.size, "bytes");
    return blob;
  } catch (err) {
    console.error("❌ dataUrlToBlob error:", err);
    return null;
  }
}

export async function uploadProfilePhoto({ userId, file, role = "employer" }) {
  if (!userId || !file) {
    console.error("❌ uploadProfilePhoto missing required params - userId:", userId, "file:", file);
    return null;
  }

  console.log("📸 uploadProfilePhoto called - userId:", userId, "fileName:", file?.name, "fileSize:", file?.size, "role:", role);

  const extension = getFileExtension(file);
  const safeName = sanitizeFileName(file?.name || `profile.${extension}`);
  const folder = role === "employee" ? "employee" : "employer";
  const path = `profile-photos/${folder}/${userId}/${Date.now()}-${safeName}`;

  console.log("📸 Upload path:", path);

  const { error: uploadError, data: uploadData } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: "3600" });

  if (uploadError) {
    console.error("❌ Supabase upload error:", uploadError);
    throw uploadError;
  }

  console.log("✅ File uploaded to Supabase - uploadData:", uploadData);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  console.log("✅ Public URL generated:", data?.publicUrl);
  
  return { publicUrl: data?.publicUrl || null, path };
}

export async function deleteProfilePhoto(path) {
  if (!path) {
    console.warn("⚠️ deleteProfilePhoto: caminho vazio");
    return;
  }
  
  try {
    console.log("🗑️ Deletando foto do Supabase:", path);
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    if (error) {
      console.error("❌ Erro ao deletar foto:", error);
      throw error;
    }
    console.log("✅ Foto deletada com sucesso");
  } catch (err) {
    console.error("❌ Erro na deleção de foto:", err);
    throw err;
  }
}

export async function loadAuthAvatar() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("❌ Erro ao carregar usuário:", error);
      throw error;
    }
    const metadata = data?.user?.user_metadata || {};
    console.log("✅ Avatar carregado dos metadados:", metadata?.avatar_url ? "encontrado" : "vazio");
    return metadata;
  } catch (err) {
    console.error("❌ Erro ao carregar avatar:", err);
    throw err;
  }
}

export async function updateAuthAvatar({ url, path }) {
  if (!url && !path) {
    console.warn("⚠️ updateAuthAvatar: url e path vazios");
    return;
  }
  
  try {
    console.log("🔄 Atualizando avatar nos metadados do auth...", { url: url?.slice(0, 50), path });
    const { error } = await supabase.auth.updateUser({
      data: {
        avatar_url: url || null,
        avatar_path: path || null,
      },
    });
    
    if (error) {
      console.error("❌ Erro ao atualizar avatar:", error);
      throw error;
    }
    console.log("✅ Avatar atualizado com sucesso nos metadados");
  } catch (err) {
    console.error("❌ Erro na atualização de avatar:", err.message);
    throw err;
  }
}
