// deno-lint-ignore no-undef
// deno-env-allow RESEND_API_KEY,RESEND_FROM_EMAIL
declare const Deno: any;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// deno-lint-ignore no-explicit-any
// deno-lint-ignore no-undef
Deno.serve(async (req: any) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    console.log("📧 [send-employee-invitation] Received request");

    const payload = await req.json();
    console.log("📧 [send-employee-invitation] Payload:", { email: payload.email, firstName: payload.firstName });

    const { email, firstName, employeeRegistrationNumber, invitationUrl } = payload;

    // Validate required fields
    if (!email || !firstName || !invitationUrl) {
      console.error("❌ Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Resend credentials from environment
    // deno-lint-ignore no-undef
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // deno-lint-ignore no-undef
    const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL");

    console.log("📧 [send-employee-invitation] RESEND_API_KEY:", resendApiKey ? "✓ Set" : "❌ Not set");
    console.log("📧 [send-employee-invitation] RESEND_FROM_EMAIL:", resendFromEmail ? "✓ Set" : "❌ Not set");

    if (!resendApiKey || !resendFromEmail) {
      console.error("❌ Resend credentials not configured");
      return new Response(
        JSON.stringify({
          error: "Resend credentials not configured",
          resendApiKeySet: !!resendApiKey,
          resendFromEmailSet: !!resendFromEmail,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build HTML email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
            .header { background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { color: #333; line-height: 1.6; }
            .button { display: inline-block; background-color: #a855f7; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #999; }
            .info-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #a855f7; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Platform!</h1>
            </div>

            <div class="content">
              <p>Hi ${firstName},</p>

              <p>You have been invited to join our evaluation platform by your employer. Please complete your registration by clicking the button below:</p>

              <center>
                <a href="${invitationUrl}" class="button">Complete Registration</a>
              </center>

              <div class="info-box">
                <strong>Employee Registration Number:</strong> ${employeeRegistrationNumber}
              </div>

              <p>If you have any questions or the link above doesn't work, you can copy and paste this URL in your browser:</p>
              <p><small>${invitationUrl}</small></p>

              <p>This link will pre-fill your registration with your name and email for a faster signup process.</p>

              <p>Best regards,<br>The Evaluation Team</p>
            </div>

            <div class="footer">
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log("📧 [send-employee-invitation] Sending email to:", email);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [email],
        subject: `Welcome, ${firstName}! Complete Your Registration`,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Resend error:", { status: response.status, body: errorText });

      let resendError: any = null;
      try {
        resendError = JSON.parse(errorText);
      } catch {
        resendError = { raw: errorText };
      }

      return new Response(
        JSON.stringify({
          error: "Failed to send email",
          provider: "resend",
          providerStatus: response.status,
          providerError: resendError,
        }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendResult = await response.json();
    console.log("✅ Resend success:", resendResult);

    return new Response(
      JSON.stringify({ success: true, email, messageId: resendResult.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
