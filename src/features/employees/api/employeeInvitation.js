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
    // Create a simple invitation URL
    // Employee will go to this page and register with their email pre-filled
    const invitationUrl = `${window.location.origin}/employee/register-from-invite?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;

    // Send email using Supabase's email service
    // We'll use a workaround: attempt to sign up with a temporary password, which sends the confirmation email
    // Then we ignore the result since the employee will set their own password during registration

    const tempPassword = generateTemporaryPassword();

    const { data, error } = await supabase.auth.signUp({
      email,
      password: tempPassword,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: "employee",
          invited_by_registration: true,
        },
        emailRedirectTo: invitationUrl,
      },
    });

    if (error) {
      // If user already exists, that's okay - we'll just inform the user
      if (error.message.includes("already registered")) {
        console.log("User already registered with this email");
        return {
          success: true,
          message: "Employee already has an account with this email",
        };
      }
      throw error;
    }

    return {
      success: true,
      userId: data.user?.id,
      email: email,
      message: "Invitation email sent successfully",
    };
  } catch (err) {
    console.error("Error sending invitation email:", err);
    throw err;
  }
}

/**
 * Generate a random temporary password
 */
function generateTemporaryPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "@#$%&*";

  const all = upper + lower + numbers + symbols;

  const shuffled = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  for (let i = 0; i < 4; i++) {
    shuffled.push(all[Math.floor(Math.random() * all.length)]);
  }

  return shuffled.sort(() => Math.random() - 0.5).join("");
}

