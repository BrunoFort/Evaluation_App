import { supabase } from "/src/lib/supabaseClient";

/**
 * Generate a random temporary password
 */
export function generateTemporaryPassword() {
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

/**
 * Invite an employee by creating auth user and sending invitation email
 */
export async function inviteEmployeeByEmail(email, firstName, lastName) {
  try {
    const tempPassword = generateTemporaryPassword();

    // Create auth user with temporary password
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password: tempPassword,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: "employee",
        },
      },
    });

    if (signupError) {
      throw new Error(signupError.message);
    }

    if (!data.user) {
      throw new Error("Failed to create user account");
    }

    // Send reset password email so employee can set their own password
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/employee/reset-password`,
    });

    if (resetError) {
      console.warn("Reset email may not have been sent:", resetError.message);
    }

    return {
      success: true,
      userId: data.user.id,
      email: email,
    };
  } catch (err) {
    console.error("Error inviting employee:", err);
    throw err;
  }
}
