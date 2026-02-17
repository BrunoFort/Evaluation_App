import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import EmployerDashboardLayout from "/src/layouts/EmployerDashboardLayout.jsx";
import Card from "/src/components/ui/Card.jsx";
import SectionCard from "/src/components/ui/SectionCard.jsx";
import Input from "/src/components/ui/Input.jsx";
import Button from "/src/components/ui/Button.jsx";
import NOCJobSelector from "/src/features/shared-noc/NOCJobSelector.jsx";
import CanadianPhoneInput from "/src/features/shared-phone/CanadianPhoneInput.jsx";
import { useEmployerAuth } from "/src/features/auth/employer/hooks/useEmployerAuth.js";
import { createEmployee } from "/src/features/employees/api/employeesApi.js";

export default function EmployerEmployeeAddPage() {
  const navigate = useNavigate();
  const { employer } = useEmployerAuth();
  const employerId = employer?.employerId;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    personalIdType: "",
    personalIdNumber: "",
    employeeRegistrationNumber: "",
    jobTitle: "",
    customJobTitle: "",
    allowCustomJobTitle: false,
    phoneCountry: "+1",
    phoneNumber: "",
    contactEmail: "",
  });

  // Validation functions
  function validatePersonalIdNumber(type, number) {
    if (!number.trim()) return false;

    switch (type) {
      case "Passport":
        return /^[A-Za-z0-9]{6,9}$/.test(number);
      case "DriversLicense":
        return /^[A-Za-z0-9]{5,15}$/.test(number);
      case "ProvincialID":
        return /^[A-Za-z0-9]{5,12}$/.test(number);
      case "PRCard":
        return /^[A-Za-z0-9]{6,12}$/.test(number);
      case "CitizenshipCertificate":
        return /^[A-Za-z0-9]{6,12}$/.test(number);
      default:
        return false;
    }
  }

  function validatePhoneNumber(number, countryCode) {
    const cleaned = number.replace(/\D/g, "");

    if (countryCode === "+1") return cleaned.length === 10;
    return cleaned.length >= 8 && cleaned.length <= 15;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!employerId) {
        setError("Employer account not found. Please sign in again.");
        return;
      }

      // Validation
      if (!form.firstName.trim()) {
        toast.error("First name is required.");
        setSaving(false);
        return;
      }

      if (!form.lastName.trim()) {
        toast.error("Last name is required.");
        setSaving(false);
        return;
      }

      if (!form.personalIdType) {
        toast.error("Personal ID type is required.");
        setSaving(false);
        return;
      }

      if (!validatePersonalIdNumber(form.personalIdType, form.personalIdNumber)) {
        toast.error("Invalid Personal ID Number format.");
        setSaving(false);
        return;
      }

      if (!form.employeeRegistrationNumber.trim()) {
        toast.error("Employee Registration Number is required.");
        setSaving(false);
        return;
      }

      const selectedJobTitle = form.allowCustomJobTitle ? form.customJobTitle : form.jobTitle;
      if (!selectedJobTitle) {
        toast.error("Job Title is required.");
        setSaving(false);
        return;
      }

      if (!form.phoneNumber.trim()) {
        toast.error("Phone number is required.");
        setSaving(false);
        return;
      }

      if (!validatePhoneNumber(form.phoneNumber, form.phoneCountry)) {
        toast.error("Invalid phone number for selected country.");
        setSaving(false);
        return;
      }

      if (!validateEmail(form.contactEmail)) {
        toast.error("Invalid email format.");
        setSaving(false);
        return;
      }

      await createEmployee({
        employerid: employerId,
        first_name: form.firstName,
        last_name: form.lastName,
        personal_id_type: form.personalIdType,
        personal_id_number: form.personalIdNumber.toUpperCase(),
        employee_registration_number: form.employeeRegistrationNumber.toUpperCase(),
        job_title: selectedJobTitle,
        phone_country: form.phoneCountry,
        phone_number: form.phoneNumber,
        contact_email: form.contactEmail.toLowerCase(),
      });

      toast.success("Employee created successfully!");
      navigate("/employer/employees");
    } catch (err) {
      console.error(err);
      setError("There was an error saving the employee. Please try again.");
    } finally {
      setSaving(false);
    }
  }


  return (
    <EmployerDashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900">Add Employee</h1>
            <p className="text-neutral-600 mt-1">
              Register a new employee in your organization
            </p>
          </div>

          <Link
            to="/employer/employees"
            className="text-sm text-purple-600 hover:text-purple-800 transition"
          >
            Back to list
          </Link>
        </div>

        {error && (
          <Card className="border-red-200 bg-red-50 text-red-700 p-4">
            {error}
          </Card>
        )}

        <Card className="p-8 border border-neutral-200 shadow-sm bg-white rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* PERSONAL INFO */}
            <SectionCard title="Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name *
                  </label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name *
                  </label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>

              </div>
            </SectionCard>

            {/* IDENTIFICATION */}
            <SectionCard title="Identification">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Personal ID Type *
                  </label>
                  <select
                    name="personalIdType"
                    value={form.personalIdType}
                    onChange={handleChange}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select ID Type</option>
                    <option value="Passport">Passport</option>
                    <option value="DriversLicense">Driver's License</option>
                    <option value="ProvincialID">Provincial ID Card</option>
                    <option value="PRCard">Permanent Resident Card</option>
                    <option value="CitizenshipCertificate">Citizenship Certificate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Personal ID Number *
                  </label>
                  <Input
                    name="personalIdNumber"
                    value={form.personalIdNumber}
                    onChange={(e) => {
                      const upper = e.target.value.toUpperCase();
                      setForm((prev) => ({ ...prev, personalIdNumber: upper }));
                    }}
                    placeholder="ID number"
                  />
                </div>

              </div>
            </SectionCard>

            {/* EMPLOYMENT DETAILS */}
            <SectionCard title="Employment Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Employee Registration Number *
                  </label>
                  <Input
                    name="employeeRegistrationNumber"
                    value={form.employeeRegistrationNumber}
                    onChange={(e) => {
                      const upper = e.target.value.toUpperCase();
                      setForm((prev) => ({ ...prev, employeeRegistrationNumber: upper }));
                    }}
                    placeholder="Registration number"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-neutral-700">Job Title *</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-700">Custom entry</span>
                      <input
                        type="checkbox"
                        checked={form.allowCustomJobTitle}
                        onChange={(e) => setForm((prev) => ({ ...prev, allowCustomJobTitle: e.target.checked }))}
                      />
                    </div>
                  </div>

                  <NOCJobSelector
                    useCustom={form.allowCustomJobTitle}
                    value={form.allowCustomJobTitle ? form.customJobTitle : form.jobTitle}
                    onChange={(v) =>
                      setForm((prev) => ({
                        ...prev,
                        [form.allowCustomJobTitle ? "customJobTitle" : "jobTitle"]: v,
                      }))
                    }
                    className="h-[42px]"
                  />
                </div>

              </div>
            </SectionCard>

            {/* CONTACT INFORMATION */}
            <SectionCard title="Contact Information">
              <div className="space-y-6">

                <CanadianPhoneInput
                  value={form.phoneNumber}
                  onChange={(v) => setForm((prev) => ({ ...prev, phoneNumber: v }))}
                  countryCode={form.phoneCountry}
                  onCountryCodeChange={(v) => setForm((prev) => ({ ...prev, phoneCountry: v }))}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Contact Email *
                  </label>
                  <Input
                    type="email"
                    name="contactEmail"
                    value={form.contactEmail}
                    onChange={(e) => {
                      const lower = e.target.value.toLowerCase();
                      setForm((prev) => ({ ...prev, contactEmail: lower }));
                    }}
                    placeholder="email@example.com"
                  />
                </div>

              </div>
            </SectionCard>

            {/* ACTIONS */}
            <div className="pt-4 flex justify-end gap-3">
              <Link
                to="/employer/employees"
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
              >
                Cancel
              </Link>

              <Button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {saving ? "Saving..." : "Save Employee"}
              </Button>
            </div>

          </form>
        </Card>
      </div>
    </EmployerDashboardLayout>
  );
}
