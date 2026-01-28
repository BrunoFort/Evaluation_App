import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "/src/components/ui/card.jsx";
import Button from "/src/components/ui/Button.jsx";
import PageHeader from "/src/components/ui/PageHeader.jsx";
import StatusPill from "/src/components/ui/StatusPill.jsx";

export default function EvaluationsList() {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:4000/evaluations");
      const data = await res.json();
      setEvaluations(data);
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <PageHeader
        title="Evaluations"
        subtitle="Manage employee evaluations"
        right={
          <Button as={Link} to="/evaluations/new">
            New Evaluation
          </Button>
        }
      />

      <Card className="p-0">
        <div className="divide-y divide-slate-200">
          {evaluations.map((ev) => (
            <Link
              key={ev.id}
              to={`/evaluations/${ev.id}`}
              className="flex items-center justify-between py-4 px-4 hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-medium text-slate-900">{ev.title}</p>
                <p className="text-sm text-slate-500">
                  {ev.createdAt
                    ? new Date(ev.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </p>
              </div>

              <StatusPill status={ev.status || "pending"} />
            </Link>
          ))}

          {evaluations.length === 0 && (
            <p className="text-center text-slate-500 py-6">
              No evaluations found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
