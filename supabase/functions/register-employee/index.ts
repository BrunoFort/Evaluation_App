// deno-lint-ignore no-undef
// deno-env-allow PROJECT_URL,SERVICE_ROLE_KEY,ANON_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(payload: Record<string, unknown>) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const normalizedEmail = (payload?.email || "").toString().trim().toLowerCase();
    const password = (payload?.password || "").toString();
    const redirectTo = (payload?.redirectTo || "").toString();

    if (!normalizedEmail || !password) {
      return jsonResponse({ error: "Missing email or password" });
    }

    const supabaseUrl = Deno.env.get("PROJECT_URL");
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return jsonResponse({ error: "Supabase keys not configured" });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    const anon = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });

    const { data: existingEmployee } = await admin
      .from("employees")
      .select("id")
      .or(`email.eq.${normalizedEmail},contact_email.eq.${normalizedEmail}`)
      .maybeSingle();

    if (existingEmployee) {
        return jsonResponse({ code: "duplicate", message: "duplicate" });
    }

    let authExists = false;
    let page = 1;
    const perPage = 1000;

      while (true) {
        const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({
          page,
          perPage,
        });

        if (usersError) {
          return jsonResponse({ error: usersError.message || "Failed to list users" });
        }

        const users = usersData?.users || [];
        authExists = users.some((user) => (user.email || "").toLowerCase() === normalizedEmail);

        if (authExists || users.length < perPage) {
          break;
        }

        page += 1;
      }

      if (authExists) {
        return jsonResponse({ code: "duplicate", message: "duplicate" });
      }

    const { data: signUpData, error: signUpError } = await anon.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: redirectTo || undefined,
      },
    });

    if (signUpError) {
      return jsonResponse({ error: signUpError.message || "Failed to create account" });
    }

    const userId = signUpData?.user?.id;

    if (!userId) {
      return jsonResponse({ error: "User not created" });
    }

    return jsonResponse({ success: true, userId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse({ error: message });
  }
});
