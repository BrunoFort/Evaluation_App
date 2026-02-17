import { supabase } from "/src/lib/supabaseClient";

/**
 * Send an invitation email to employee to register
 * The employee will visit a registration page with their email pre-filled
 */
export async function sendEmployeeInvitationEmail(
  email,
  firstName,
  lastName,
  employeeRegistrationNumber
) {
  try {
    // Create invitation URL
    const invitationUrl = `${window.location.origin}/employee/register?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

    // For now, we'll just log the invitation
    // In production, you would integrate with your email service or Supabase Functions
    console.log("📧 Invitation Email Details:", {
      to: email,
      subject: `Welcome! Complete Your Registration`,
      body: `Hi ${firstName},\n\nYou have been invited to join our platform.\n\nClick here to complete your registration: ${invitationUrl}\n\nEmployee Registration Number: ${employeeRegistrationNumber}`,
    });

    // Since we can't send actual emails without a backend service/function,
    // we'll use a toast notification to inform the employer
    return {
      success: true,
      email: email,
      message: "Employee created successfully. In production, invitation email would be sent.",
      invitationUrl: invitationUrl,
    };
  } catch (err) {
    console.error("Error preparing invitation email:", err);
    throw err;
  }
}


