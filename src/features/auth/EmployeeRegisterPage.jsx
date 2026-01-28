import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Input from "/src/components/ui/input.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";

export default function EmployeeRegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password, confirm } = form;

    // Validações básicas
    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // MOCK — substituir por backend real
    setTimeout(() => {
      localStorage.setItem(
        "employee",
        JSON.stringify({
          name,
          email,
          employeeId: 1,
        })
      );

      navigate("/employee");
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-xl space-y-8">

        <PageHeader
          title="Employee Registration"
          subtitle="Create your employee account"
          align="center"
        />

        <Card padding="lg" shadow="md" className="bg-white/80 backdrop-blur space-y-6">

          {error && (
            <div className="text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="bg-white"
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="bg-white"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className="bg-white"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirm}
              onChange={(e) => updateField("confirm", e.target.value)}
              className="bg-white"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="flex items-center justify-between text-sm text-slate-600 pt-2">
            <Link to="/employee/login" className="hover:text-blue-600">
              Already have an account?
            </Link>

            <Link to="/employee/forgot-password" className="hover:text-blue-600">
              Forgot password?
            </Link>
          </div>

          <p className="text-center text-sm text-slate-600 mt-4">
            Employer login instead{" "}
            <Link
              to="/employer/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Click here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
