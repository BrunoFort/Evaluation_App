// deno-lint-ignore no-undef
// deno-env-allow GMAIL_EMAIL,GMAIL_APP_PASSWORD

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
    const payload = await req.json();

    const { email, firstName, lastName, employeeRegistrationNumber, invitationUrl } = payload;

    // Validate required fields
    if (!email || !firstName || !invitationUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Gmail credentials from environment
    // deno-lint-ignore no-undef
    const gmailEmail = Deno.env.get("GMAIL_USER");
    // deno-lint-ignore no-undef
    const gmailPassword = Deno.env.get("GMAIL_PASSWORD");
    
    if (!gmailEmail || !gmailPassword) {
      console.error("Gmail credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
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

    // Send email via Gmail SMTP
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${gmailPassword}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: email }],
          },
        ],
        from: { email: gmailEmail },
        subject: `Welcome, ${firstName}! Complete Your Registration`,
        content: [
          {
            type: "text/html",
            value: htmlContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("SendGrid API error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, email: email }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
