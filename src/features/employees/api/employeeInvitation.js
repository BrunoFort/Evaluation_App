import { supabase } from "/src/lib/supabaseClient";

/**
 * Send an invitation email to employee to register
 * Uses Supabase Edge Function to send email
 */
export async function sendEmployeeInvitationEmail(
  email,
  firstName,
  lastName,
  employeeRegistrationNumber
) {
  try {
    // Create invitation URL with pre-filled data
    const invitationUrl = `${window.location.origin}/employee/register?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

    console.log("📧 Calling Edge Function to send invitation email...");
    console.log("   Email:", email);
    console.log("   URL:", invitationUrl);

    // Get the current session to get the auth token
    const { data: { session } } = await supabase.auth.getSession();
    
    // Prepare headers
    const headers = {
      "Content-Type": "application/json",
    };
    
    // Add auth header if session exists
    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
      console.log("📧 Using authenticated session");
    } else {
      console.log("📧 No auth session - making unauthenticated request");
    }

    // Get Supabase URL from environment or from client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const functionUrl = `${supabaseUrl}/functions/v1/send-employee-invitation`;

    console.log("📧 Calling:", functionUrl);

    // Call the Edge Function directly via fetch
    const response = await fetch(functionUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        employeeRegistrationNumber,
        invitationUrl,
      }),
    });

    console.log("📧 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Edge Function error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Edge Function returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Edge Function success:", data);

    return {
      success: true,
      email: email,
      message: "Invitation email sent successfully",
    };
  } catch (err) {
    console.error("❌ Error sending invitation email:", err);
    throw err;
  }
}



