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

    const payload = {
      email,
      firstName,
      lastName,
      employeeRegistrationNumber,
      invitationUrl,
    };

    const invokeFunction = async () => {
      const { data, error } = await supabase.functions.invoke("send-employee-invitation", {
        body: payload,
      });

      if (error) {
        let parsedContext = null;
        try {
          if (error.context?.json) {
            parsedContext = await error.context.json();
          }
        } catch {
          parsedContext = null;
        }

        const contextText = JSON.stringify(parsedContext || {});
        const isResendSandbox =
          /testing emails to your own email address/i.test(contextText) ||
          /verify a domain at resend.com\/domains/i.test(contextText) ||
          parsedContext?.providerStatus === 403;

        const enrichedError = new Error(error.message || "Unknown Edge Function error");
        enrichedError.isResendSandbox = isResendSandbox;
        enrichedError.providerStatus = parsedContext?.providerStatus;
        enrichedError.providerError = parsedContext?.providerError;
        enrichedError.details = parsedContext;
        throw enrichedError;
      }

      return data;
    };

    let data;

    try {
      data = await invokeFunction();
    } catch (firstError) {
      const shouldRetryAuth = /401|JWT|authorization/i.test(String(firstError?.message || ""));
      if (!shouldRetryAuth) throw firstError;

      console.warn("📧 First invoke failed, trying to refresh auth session...");
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        throw new Error(`Failed to refresh auth session: ${refreshError.message}`);
      }

      data = await invokeFunction();
    }

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



