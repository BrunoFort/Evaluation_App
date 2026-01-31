import React from "react";
import EmployeeDashboardLayout from "@/layouts/EmployeeDashboardLayout";
import { Star, Link as LinkIcon, ClipboardList } from "lucide-react";

export default function EmployeeDashboardPage() {
  return (
    <EmployeeDashboardLayout>

      {/* Latest Evaluation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Your Latest Evaluation
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">
                Senior Developer
              </h3>
              <p className="text-neutral-600">Acme Corp — Jan 2026</p>
            </div>

            <div className="flex gap-1">
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-yellow-500" />
              <Star className="w-6 h-6 text-neutral-300" />
            </div>
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition">
            View Full Evaluation
          </button>
        </div>
      </section>

      {/* Share Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Share Your Reference
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <p className="text-neutral-700 mb-4">
            Use the link below to share your verified Shine reference with recruiters or employers.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <code className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-800 text-sm">
              https://shine.app/ref/abc123
            </code>

            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Copy
            </button>
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition">
            Open Public Page
          </button>
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Evaluation History
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <div className="flex items-center justify-between py-4 border-b border-neutral-200">
            <div>
              <p className="font-medium text-neutral-900">Frontend Developer</p>
              <p className="text-neutral-600 text-sm">Globex — 2024</p>
            </div>
            <ClipboardList className="w-6 h-6 text-purple-600" />
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-neutral-900">Junior Developer</p>
              <p className="text-neutral-600 text-sm">Innotech — 2022</p>
            </div>
            <ClipboardList className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </section>

    </EmployeeDashboardLayout>
  );
}
