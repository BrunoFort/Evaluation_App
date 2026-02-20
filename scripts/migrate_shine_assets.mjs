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

const sourceBucket = "shine-assets";
const targetBucket = "shime-assets";
const prefixes = ["branding", "profile-photos"];

async function ensureBucketExists() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;
  const exists = (buckets || []).some((entry) => entry.name === targetBucket);
  if (exists) return;
  const { error: createError } = await supabase.storage.createBucket(targetBucket, {
    public: true,
  });
  if (createError) throw createError;
}

function joinPath(prefix, name) {
  return prefix ? `${prefix}/${name}` : name;
}

async function listAllObjects(prefix) {
  const results = [];
  const stack = [prefix];

  while (stack.length > 0) {
    const current = stack.pop();
    const { data, error } = await supabase.storage
      .from(sourceBucket)
      .list(current, { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });

    if (error) throw error;

    for (const entry of data || []) {
      if (entry.id) {
        results.push(joinPath(current, entry.name));
      } else {
        stack.push(joinPath(current, entry.name));
      }
    }
  }

  return results;
}

async function toBuffer(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function copyObject(path) {
  const { data: downloadData, error: downloadError } = await supabase.storage
    .from(sourceBucket)
    .download(path);

  if (downloadError) throw downloadError;

  const contentType = downloadData?.type || "application/octet-stream";
  const buffer = await toBuffer(downloadData);

  const { error: uploadError } = await supabase.storage
    .from(targetBucket)
    .upload(path, buffer, { upsert: true, contentType });

  if (uploadError) throw uploadError;

  const { error: removeError } = await supabase.storage
    .from(sourceBucket)
    .remove([path]);

  if (removeError) throw removeError;
}

async function main() {
  await ensureBucketExists();

  let total = 0;
  for (const prefix of prefixes) {
    const objects = await listAllObjects(prefix);
    for (const objectPath of objects) {
      await copyObject(objectPath);
      total += 1;
      if (total % 20 === 0) {
        console.log(`Migrated ${total} files...`);
      }
    }
  }

  console.log(`Migration complete. Total files migrated: ${total}`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
