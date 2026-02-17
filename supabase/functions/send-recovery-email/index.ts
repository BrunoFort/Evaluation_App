import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const GMAIL_USER = Deno.env.get("GMAIL_USER");
const GMAIL_PASSWORD = Deno.env.get("GMAIL_PASSWORD");
const RESET_REDIRECT_URL = Deno.env.get("RESET_REDIRECT_URL");

serve(async (req) => {
  try {
    const { email, firstName } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing email" }),
        { status: 400 }
      );
    }

    // Check if Gmail credentials are configured
    if (!GMAIL_USER || !GMAIL_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Gmail credentials not configured" }),
        { status: 500 }
      );
    }

    if (!RESET_REDIRECT_URL) {
      return new Response(
        JSON.stringify({ error: "RESET_REDIRECT_URL not configured" }),
        { status: 500 }
      );
    }

    // Initialize Supabase Admin client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    console.log("📍 Generating recovery link for:", email);
    
    // Generate recovery link using Admin API
    const { data, error: linkError } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: email,
      options: {
        redirectTo: RESET_REDIRECT_URL,
      },
    });

    if (linkError || !data?.properties?.recovery_link) {
      console.error("Link generation error:", linkError);
      return new Response(
        JSON.stringify({ error: "Failed to generate recovery link", details: linkError }),
        { status: 500 }
      );
    }

    const recoveryLink = data.properties.recovery_link;
    console.log("📍 Recovery link generated");

    // Prepare personalized email content
    const greetingName = firstName && firstName !== "there" ? firstName : "there";

    const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset your password</title>
</head>
<body style="margin:0; padding:0; background:#f7f5ff; font-family:Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f5ff; padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #eee;">
          <tr>
            <td align="center" style="padding:18px 32px; background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%);">
              <img src="https://res.cloudinary.com/ddawecreo/image/upload/v1770947129/shine-logo_zqbtpm.png" alt="Shine" style="height:150px; display:block;">
              <h1 style="margin:8px 0 0 0; font-size:26px; color:#ffffff; font-weight:600;">Reset your password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 60px 8px 60px; text-align:center; color:#4b4453; font-size:16px; line-height:1.7;">
              Hi ${greetingName},
            </td>
          </tr>
          <tr>
            <td style="padding:0 60px 22px 60px; text-align:center; color:#4b4453; font-size:16px; line-height:1.7;">
              We received a request to reset your <strong style="color:#7c3aed;">Shine</strong> password.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 60px 26px 60px; font-size:14px; color:#6f677d;">
              <a href="${recoveryLink}" style="display:inline-block; padding:12px 32px; background:#7c3aed; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Reset Password</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 60px 34px 60px; font-size:12px; color:#8a8396; text-align:center;">
              This link expires in 1 hour. If you didn't request this, please ignore this email.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:18px; background:#f9f7ff; font-size:12px; color:#8a8396;">
              © 2026 <strong style="color:#7c3aed;">Shine</strong> — Professional Performance Evaluations
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send email via Gmail SMTP
    console.log("📍 Sending email via Gmail SMTP...");

    const client = new SmtpClient();
    
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: GMAIL_USER,
      password: GMAIL_PASSWORD,
    });

    await client.send({
      from: GMAIL_USER,
      to: email,
      subject: "Reset your Shine password",
      content: emailHtml,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });

    await client.close();

    console.log("📍 Email sent successfully via Gmail SMTP");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset email sent successfully",
      }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});

