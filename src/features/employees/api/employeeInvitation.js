import { supabase } from "/src/lib/supabaseClient";

/**
 * Send an invitation email to employee to register
 * Uses Supabase Edge Function to send email via Resend
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

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke(
      "send-employee-invitation",
      {
        body: {
          email,
          firstName,
          lastName,
          employeeRegistrationNumber,
          invitationUrl,
        },
      }
    );

    if (error) {
      console.error("Error calling edge function:", error);
      throw new Error(error.message || "Failed to send invitation email");
    }

    return {
      success: true,
      email: email,
      messageId: data.messageId,
      message: "Invitation email sent successfully",
    };
  } catch (err) {
    console.error("Error sending invitation email:", err);
    throw err;
  }
}



