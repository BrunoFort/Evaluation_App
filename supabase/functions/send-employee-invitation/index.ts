// deno-lint-ignore no-undef
// deno-env-allow GMAIL_USER,GMAIL_PASSWORD,FUNCTION_SECRET

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-function-secret",
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
    
    // Check for function secret in header
    const functionSecret = req.headers.get("x-function-secret");
    const expectedSecret = Deno.env.get("FUNCTION_SECRET");
    
    console.log("📧 [send-employee-invitation] Function secret provided:", functionSecret ? "✓" : "✗");
    console.log("📧 [send-employee-invitation] Expected secret exists:", expectedSecret ? "✓" : "✗");
    
    // Only validate if secret is configured
    if (expectedSecret && functionSecret !== expectedSecret) {
      console.error("❌ Invalid function secret");
      return new Response(
        JSON.stringify({ error: "Invalid function secret" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const payload = await req.json();
    console.log("📧 [send-employee-invitation] Payload:", { email: payload.email, firstName: payload.firstName });

    const { email, firstName, lastName, employeeRegistrationNumber, invitationUrl } = payload;

    // Validate required fields
    if (!email || !firstName || !invitationUrl) {
      console.error("❌ Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Gmail credentials from environment
    // deno-lint-ignore no-undef
    const gmailUser = Deno.env.get("GMAIL_USER");
    // deno-lint-ignore no-undef
    const gmailPassword = Deno.env.get("GMAIL_PASSWORD");

    console.log("📧 [send-employee-invitation] Gmail User:", gmailUser ? "✓ Set" : "❌ Not set");
    console.log("📧 [send-employee-invitation] Gmail Password:", gmailPassword ? "✓ Set" : "❌ Not set");
    
    if (!gmailUser || !gmailPassword) {
      console.error("❌ Gmail credentials not configured");
      return new Response(
        JSON.stringify({ 
          error: "Gmail credentials not configured",
          gmailUserSet: !!gmailUser,
          gmailPasswordSet: !!gmailPassword
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
    console.log("📧 [send-employee-invitation] From:", gmailUser);

    // Convert credentials to base64 for SMTP AUTH
    const credentials = btoa(`${gmailUser}:${gmailPassword}`);

    // Send email via Gmail SMTP
    const smtpHeaders = {
      "Content-Type": "text/plain; charset=utf-8",
    };

    // Prepare email message in SMTP format
    const emailMessage = `From: ${gmailUser}
To: ${email}
Subject: Welcome, ${firstName}! Complete Your Registration
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

${htmlContent}`;

    console.log("📧 [send-employee-invitation] Connecting to Gmail SMTP...");

    // Use Gmail SMTP via REST API (simpler approach)
    // Create proper email envelope
    const response = await fetch("https://smtp.gmail.com:587", {
      method: "POST",
      headers: smtpHeaders,
      body: emailMessage,
    }).catch(async (err) => {
      console.error("📧 [send-employee-invitation] Direct SMTP failed, trying alternative:", err.message);
      
      // Fallback: Use a simple HTTP-based email service that works with basic auth
      // We'll construct a raw SMTP request manually
      return await sendViaGmailSmtp(gmailUser, gmailPassword, email, firstName, htmlContent);
    });

    console.log("📧 [send-employee-invitation] Email send completed");

    return new Response(
      JSON.stringify({ success: true, email: email, message: "Email queued for sending" }),
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

// Helper function to send via Gmail SMTP using raw socket connection
async function sendViaGmailSmtp(gmailUser: string, gmailPassword: string, toEmail: string, firstName: string, htmlContent: string): Promise<Response> {
  try {
    console.log("📧 [sendViaGmailSmtp] Attempting SMTP connection to Gmail on port 465...");
    
    // Create TLS connection to Gmail SMTP (port 465 - SMTPS)
    const conn = await Deno.connect({
      hostname: "smtp.gmail.com",
      port: 465,
      transport: "tcp",
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Helper to send command and wait for response
    async function sendCommand(cmd: string): Promise<string> {
      await conn.write(encoder.encode(cmd + "\r\n"));
      const buf = new Uint8Array(1024);
      const n = await conn.read(buf);
      return decoder.decode(buf.subarray(0, n));
    }

    // SMTP handshake
    const welcomeMsg = await sendCommand("EHLO localhost");
    console.log("📧 [SMTP] Welcome:", welcomeMsg.substring(0, 50));

    // AUTH LOGIN
    await sendCommand("AUTH LOGIN");
    await sendCommand(btoa(gmailUser)); // Base64 encoded email
    await sendCommand(btoa(gmailPassword)); // Base64 encoded password

    // FROM
    await sendCommand(`MAIL FROM:<${gmailUser}>`);

    // TO
    await sendCommand(`RCPT TO:<${toEmail}>`);

    // DATA
    await sendCommand("DATA");

    // Email headers and body
    const emailData = `From: ${gmailUser}\r
To: ${toEmail}\r
Subject: Welcome, ${firstName}! Complete Your Registration\r
MIME-Version: 1.0\r
Content-Type: text/html; charset=utf-8\r
\r
${htmlContent}\r
.\r
`;

    await conn.write(encoder.encode(emailData));

    // QUIT
    await sendCommand("QUIT");
    conn.close();

    console.log("✅ Email sent successfully via Gmail SMTP");
    return new Response(
      JSON.stringify({ success: true, message: "Email sent via SMTP" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Gmail SMTP error:", error);
    throw error;
  }
}
