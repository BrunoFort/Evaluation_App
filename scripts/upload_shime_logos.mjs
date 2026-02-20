import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const bucket = "shime-assets";
const uploads = [
  {
    envVar: "VITE_SHIME_LOGO_WHITE_URL",
    localPath: path.join(repoRoot, "src/assets/shime-logo-white.png"),
    remotePath: "branding/shime-logo-white.png",
  },
  {
    envVar: "VITE_SHIME_LOGO_BLACK_URL",
    localPath: path.join(repoRoot, "src/assets/shime-logo-black.png"),
    remotePath: "branding/shime-logo-black.png",
  },
];

async function uploadOne(item) {
  const fileBuffer = await fs.readFile(item.localPath);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(item.remotePath, fileBuffer, {
      upsert: true,
      contentType: "image/png",
      cacheControl: "3600",
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(item.remotePath);
  return { envVar: item.envVar, publicUrl: data?.publicUrl || "" };
}

async function ensureBucketExists() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) {
    throw error;
  }

  const exists = (buckets || []).some((entry) => entry.name === bucket);
  if (exists) return;

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
  });

  if (createError) {
    throw createError;
  }
}

async function main() {
  const results = [];

  await ensureBucketExists();

  for (const item of uploads) {
    results.push(await uploadOne(item));
  }

  console.log("Upload complete. Add these to .env:");
  for (const result of results) {
    console.log(`${result.envVar}=${result.publicUrl}`);
  }
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
