// deno-lint-ignore no-undef
// deno-env-allow PROJECT_URL,SERVICE_ROLE_KEY,ANON_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const normalizedEmail = (payload?.contactEmail || "").toString().trim().toLowerCase();
    const password = (payload?.password || "").toString();
    const redirectTo = (payload?.redirectTo || "").toString();

    if (!normalizedEmail || !password) {
      return jsonResponse({ error: "Missing email or password" }, 400);
    }

    const supabaseUrl = Deno.env.get("PROJECT_URL");
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return jsonResponse({ error: "Supabase keys not configured" }, 500);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
    const anon = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });

    const { data: existingEmployer } = await admin
      .from("employers")
      .select("id")
      .or(`email.ilike.${normalizedEmail},contact_email.ilike.${normalizedEmail}`)
      .maybeSingle();

    if (existingEmployer) {
      return jsonResponse({ code: "duplicate", message: "duplicate" }, 409);
    }

    let authExists = false;
    let page = 1;
    const perPage = 1000;

    while (page) {
      const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (usersError) {
        return jsonResponse({ error: usersError.message || "Failed to list users" }, 500);
      }

      const users = usersData?.users || [];
      authExists = users.some((user) => (user.email || "").toLowerCase() === normalizedEmail);

      if (authExists || users.length < perPage) {
        break;
      }

      page = usersData?.nextPage ?? 0;
    }

    if (authExists) {
      return jsonResponse({ code: "duplicate", message: "duplicate" }, 409);
    }

    const { data: signUpData, error: signUpError } = await anon.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: redirectTo || undefined,
        data: { first_name: payload?.firstName || "" },
      },
    });

    if (signUpError) {
      return jsonResponse({ error: signUpError.message || "Failed to create account" }, 400);
    }

    const userId = signUpData?.user?.id;

    if (!userId) {
      return jsonResponse({ error: "User not created" }, 500);
    }

    const { password: _pw, confirmPassword: _cpw, ...employerPayload } = payload || {};
    employerPayload.id = userId;

    const { error: registerError } = await admin.rpc("register_employer", {
      payload: employerPayload,
    });

    if (registerError) {
      await admin.auth.admin.deleteUser(userId);
      return jsonResponse({ error: registerError.message || "Failed to register employer" }, 500);
    }

    return jsonResponse({ success: true, userId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse({ error: message }, 500);
  }
});
