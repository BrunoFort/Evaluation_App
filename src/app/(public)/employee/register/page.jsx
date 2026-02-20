import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "/src/lib/supabaseClient";
import { toast } from "sonner";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import ProfilePhotoUploader from "/src/features/shared-photo/ProfilePhotoUploader";
import {
  loadPhoto,
  removePhoto,
  savePhoto,
  readFileAsDataUrl,
} from "/src/features/shared-photo/photoStorage";
import {
  dataUrlToBlob,
  uploadProfilePhoto,
  updateAuthAvatar,
} from "/src/features/shared-photo/supabasePhotoStorage";

export default function EmployeeRegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get pre-filled values from URL (for invited employees)
  const invitedEmail = searchParams.get("email") || "";
  const invitedFirstName = searchParams.get("firstName") || "";
  const invitedLastName = searchParams.get("lastName") || "";

  const [form, setForm] = useState({
    name: invitedFirstName && invitedLastName ? `${invitedFirstName} ${invitedLastName}` : "",
    email: invitedEmail,
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const registerPhotoKey = "employee-register-photo";

  useEffect(() => {
    setPhotoUrl(loadPhoto(registerPhotoKey));
  }, []);

  async function handlePhotoUpload(file) {
    const dataUrl = await readFileAsDataUrl(file);
    setPhotoUrl(dataUrl);
    savePhoto(registerPhotoKey, dataUrl);
  }

  function handlePhotoDelete() {
    setPhotoUrl(null);
    removePhoto(registerPhotoKey);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validatePassword(password) {
    if (!password || password.length < 8) return false;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@#$%&*]/.test(password);
    return hasUpper && hasLower && hasNumber && hasSymbol;
  }

  function passwordHelpText() {
    return "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and one of @, #, $, %, &, *.";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const { name, email, password, confirm } = form;
    const normalizedEmail = (email || "").toLowerCase();

    if (!name || !normalizedEmail || !password || !confirm) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(passwordHelpText());
      toast.error(passwordHelpText());
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Senhas nao correspondem");
      toast.error("Senhas nao correspondem");
      setLoading(false);
      return;
    }

    const { data: existingEmployee, error: existingError } = await supabase
      .from("employees")
      .select("id")
      .or(`email.eq.${normalizedEmail},contact_email.eq.${normalizedEmail}`)
      .maybeSingle();

    if (existingError) {
      console.warn("Employee pre-check failed:", existingError);
    }

    if (existingEmployee) {
      setError("An employee with this email already exists. Please login.");
      toast.error("An employee with this email already exists. Please login.");
      setLoading(false);
      return;
    }

    const redirectTo = `${window.location.origin}/employee/login`;

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (signUpError) {
      const rawMessage = signUpError.message || "Failed to create account.";
      const message = rawMessage.toLowerCase().includes("already")
        ? "An account with this email already exists. Please login."
        : rawMessage;
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    const userId = signUpData.user.id;

    const storedPhoto = loadPhoto(registerPhotoKey);
    if (storedPhoto) {
      const blob = dataUrlToBlob(storedPhoto);
      if (blob) {
        const uploadResult = await uploadProfilePhoto({
          userId,
          file: blob,
          role: "employee",
        });
        await updateAuthAvatar({
          url: uploadResult?.publicUrl,
          path: uploadResult?.path,
        });
      }
    }
    removePhoto(registerPhotoKey);

    const { data: identity } = await supabase
      .from("employee_identity")
      .select("globalemployeekey")
      .eq("employeeid", userId)
      .maybeSingle();

    let globalKey = identity?.globalemployeekey;

    if (!globalKey) {
      globalKey = crypto.randomUUID();

      await supabase.from("employee_identity").insert({
        employeeid: userId,
        globalemployeekey: globalKey,
      });
    }

    toast.success("Registration completed. Check your email to confirm your account.");
    setSuccessMessage(
      "Registration completed. We sent a confirmation email. Please confirm to finish your account."
    );
    setLoading(false);
    return;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-xl space-y-8">

        <PageHeader
          title="Employee Registration"
          subtitle="Create your employee account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="space-y-6">
          <div className="flex justify-end">
            <ProfilePhotoUploader
              photoUrl={photoUrl}
              onUpload={handlePhotoUpload}
              onDelete={handlePhotoDelete}
            />
          </div>

          {successMessage && (
            <div className="text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!successMessage && (
            <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value.toLowerCase())}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={(e) => updateField("confirm", e.target.value)}
            />

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                fullWidth
                size="lg"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </form>
          )}

          {successMessage && (
            <Link
              to="/employee/login"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            >
              Return to Login
            </Link>
          )}

          <div className="flex items-center justify-between text-sm text-neutral-600 pt-2">
            <Link to="/employee/login" className="hover:text-purple-600">
              Already have an account?
            </Link>

            <Link to="/employee/forgot-password" className="hover:text-purple-600">
              Forgot password?
            </Link>
          </div>

          <p className="text-center text-sm text-neutral-600 mt-4">
            Employer login instead{" "}
            <Link
              to="/employer/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Click here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
