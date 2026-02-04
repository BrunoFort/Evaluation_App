// src/features/employers/components/EmployerForm.jsx

import { useForm } from "react-hook-form";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "/src/components/ui/Input.jsx";
import { Label } from "/src/components/ui/Label.jsx";
import NOCJobSelector from "@/features/shared-noc/NOCJobSelector";

export function EmployerForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const jobTitle = watch("jobTitle");
  const jobTitleCustom = watch("jobTitleCustom");

  // Register fields for validation
  register("jobTitle", {
    validate: (value, formValues) => {
      if (!formValues.jobTitleCustom && !value) {
        return "Job title is required";
      }
      return true;
    },
  });

  register("jobTitleCustom");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">

      {/* Company Name */}
      <div className="flex flex-col gap-2">
        <Label>Company Name</Label>
        <Input
          {...register("companyName", { required: "Company name is required" })}
          placeholder="ABC Consulting Inc."
        />
        {errors.companyName && (
          <p className="text-red-600 text-sm">{errors.companyName.message}</p>
        )}
      </div>

      {/* Business Number */}
      <div className="flex flex-col gap-2">
        <Label>Business Number</Label>
        <Input
          {...register("businessNumber", {
            required: "Business Number is required",
          })}
          placeholder="123456789"
        />
        {errors.businessNumber && (
          <p className="text-red-600 text-sm">{errors.businessNumber.message}</p>
        )}
      </div>

      {/* Evaluator Name */}
      <div className="flex flex-col gap-2">
        <Label>Evaluator Name</Label>
        <Input
          {...register("evaluatorName", {
            required: "Evaluator name is required",
          })}
          placeholder="John Doe"
        />
        {errors.evaluatorName && (
          <p className="text-red-600 text-sm">{errors.evaluatorName.message}</p>
        )}
      </div>

      {/* Evaluator Position */}
      <div className="flex flex-col gap-2">
        <Label>Evaluator Position</Label>
        <Input
          {...register("evaluatorPosition", {
            required: "Evaluator position is required",
          })}
          placeholder="HR Manager"
        />
        {errors.evaluatorPosition && (
          <p className="text-red-600 text-sm">{errors.evaluatorPosition.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="hr@company.ca"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <Label>Phone</Label>
        <Input
          {...register("phone", { required: "Phone is required" })}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-600 text-sm">{errors.phone.message}</p>
        )}
      </div>

      {/* Employer Job Title */}
      <div className="flex flex-col gap-2">
        <NOCJobSelector
          label="Employer Job Title"
          value={jobTitle}
          onChange={(v) => setValue("jobTitle", v)}
          customValue={jobTitleCustom}
          onCustomChange={(v) => setValue("jobTitleCustom", v)}
        />

        {errors.jobTitle && (
          <p className="text-red-600 text-sm">{errors.jobTitle.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </Button>

    </form>
  );
}

