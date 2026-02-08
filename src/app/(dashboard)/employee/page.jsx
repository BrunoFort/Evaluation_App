import { useEffect, useState } from "react";
import { supabase } from "/src/lib/supabaseClient";
import EmployeeDashboardLayout from "/src/layouts/EmployeeDashboardLayout.jsx";
import { Star, Link as LinkIcon, ClipboardList } from "lucide-react";

export default function EmployeeDashboardPage() {
  const [summary, setSummary] = useState(null);
  const [publicLink, setPublicLink] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadSummary() {
    const { data, error } = await supabase.rpc("get_employee_summary");
    if (!error && data && data.length > 0) {
      setSummary(data[0]);
    }
  }

  async function loadOrCreateLink() {
    const {
      data: identity,
      error: identityError,
    } = await supabase
      .from("employee_identity")
      .select("globalemployeekey")
      .eq("employeeid", (await supabase.auth.getUser()).data.user.id)
      .maybeSingle();

    if (identityError || !identity) return;

    const globalKey = identity.globalemployeekey;

    const { data: token } = await supabase.rpc("generate_evaluation_link", {
      global_key: globalKey,
    });

    setPublicLink(`https://shine.app/evaluations?token=${token}`);
  }

  useEffect(() => {
    async function init() {
      await loadSummary();
      await loadOrCreateLink();
      setLoading(false);
    }
    init();
  }, []);

  return (
    <EmployeeDashboardLayout>
      {/* Latest Evaluation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Your Latest Evaluation
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          {summary ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">
                    Overall Score
                  </h3>
                  <p className="text-neutral-600">
                    Based on {summary.total_reviews} evaluations
                  </p>
                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i <= Math.round(summary.overall_avg)
                          ? "text-yellow-500"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition">
                View Full Evaluation History
              </button>
            </>
          ) : (
            <p className="text-neutral-600">No evaluations yet.</p>
          )}
        </div>
      </section>

      {/* Share Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Share Your Reference
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <p className="text-neutral-700 mb-4">
            Share your verified Shine reference with recruiters or employers.
          </p>

          {publicLink && (
            <div className="flex items-center gap-4 mb-6">
              <code className="px-4 py-2 bg-neutral-100 rounded-lg text-neutral-800 text-sm">
                {publicLink}
              </code>

              <button
                onClick={() => navigator.clipboard.writeText(publicLink)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <LinkIcon className="w-4 h-4" />
                Copy
              </button>
            </div>
          )}

          <a
            href={publicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-lg hover:opacity-90 transition inline-block"
          >
            Open Public Page
          </a>
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Evaluation History
        </h2>

        <div className="p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <p className="text-neutral-600">Coming soon.</p>
        </div>
      </section>
    </EmployeeDashboardLayout>
  );
}
