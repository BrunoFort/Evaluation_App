import { useEffect, useState } from "react";
import { supabase } from "/src/lib/supabaseClient";
import ProfilePhotoUploader from "/src/features/shared-photo/ProfilePhotoUploader.jsx";
import { updateEmployer, getEmployerById } from "/src/features/employers/api/employersApi.js";
import { toast } from "sonner";

export default function EmployerSettingsPage() {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    businessNumber: "",
    personalIdType: "",
    personalIdNumber: "",
  });

  useEffect(() => {
    async function load() {
      const session = (await supabase.auth.getSession()).data.session;
      if (!session) return;

      const employerId = session.user.id;
      const data = await getEmployerById(employerId);

      setEmployer(data);
      setForm({
        companyName: data.companyName || "",
        email: data.email || "",
        street: data.street || "",
        city: data.city || "",
        province: data.province || "",
        postalCode: data.postalCode || "",
        businessNumber: data.businessNumber || "",
        personalIdType: data.personalIdType || "",
        personalIdNumber: data.personalIdNumber || "",
      });

      setLoading(false);
    }

    load();
  }, []);

  async function handlePhotoUpload(file) {
    try {
      const employerId = employer.uuid;

      const filePath = `profile-photos/employers/${employerId}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("shine-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("shine-assets")
        .getPublicUrl(filePath);

      const newUrl = publicUrlData.publicUrl;

      const updated = await updateEmployer(employerId, { photoUrl: newUrl });
      setEmployer(updated);

      toast.success("Foto atualizada.");
    } catch (err) {
      toast.error("Erro ao enviar foto.");
    }
  }

  async function handlePhotoDelete() {
    try {
      const employerId = employer.uuid;
      const filePath = `profile-photos/employers/${employerId}.jpg`;

      await supabase.storage.from("shine-assets").remove([filePath]);

      const updated = await updateEmployer(employerId, { photoUrl: null });
      setEmployer(updated);

      toast.success("Foto removida.");
    } catch (err) {
      toast.error("Erro ao remover foto.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      const employerId = employer.uuid;

      const updated = await updateEmployer(employerId, form);
      setEmployer(updated);

      toast.success("Informações salvas.");
    } catch (err) {
      toast.error("Erro ao salvar.");
    }
  }

  if (loading) return <p className="p-6">Carregando…</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">

      <h1 className="text-3xl font-bold text-neutral-900">
        Employer Settings
      </h1>

      <ProfilePhotoUploader
        photoUrl={employer.photoUrl}
        onUpload={handlePhotoUpload}
        onDelete={handlePhotoDelete}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Street</label>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Province</label>
          <input
            name="province"
            value={form.province}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Business Number</label>
          <input
            name="businessNumber"
            value={form.businessNumber}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Personal ID Type</label>
          <input
            name="personalIdType"
            value={form.personalIdType}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Personal ID Number</label>
          <input
            name="personalIdNumber"
            value={form.personalIdNumber}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        Save Changes
      </button>
    </div>
  );
}
