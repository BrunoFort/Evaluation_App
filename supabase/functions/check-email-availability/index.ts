// deno-lint-ignore no-undef
// deno-env-allow PROJECT_URL,SERVICE_ROLE_KEY,ANON_KEY
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const rawEmail = (payload?.email || "").toString().trim().toLowerCase();
    const role = (payload?.role || "").toString();

    if (!rawEmail) {
      return new Response(
        JSON.stringify({ error: "Missing email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("PROJECT_URL");
    const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
    const anonKey = Deno.env.get("ANON_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Supabase service role not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Auth user checks are handled by signUp on the client. Use service role to bypass RLS for table checks.

    let tableHit = false;
    if (role === "employer") {
      const { data: employer } = await admin
        .from("employers")
        .select("id")
        .or(`email.ilike.${rawEmail},contact_email.ilike.${rawEmail}`)
        .maybeSingle();
      tableHit = Boolean(employer);
    } else if (role === "employee") {
      const { data: employee } = await admin
        .from("employees")
        .select("id")
        .or(`email.ilike.${rawEmail},contact_email.ilike.${rawEmail}`)
        .maybeSingle();
      tableHit = Boolean(employee);
    }

    const exists = tableHit;

    return new Response(
      JSON.stringify({ exists }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
