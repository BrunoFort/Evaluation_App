import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../../components/ui/Card.jsx";
import Button from "../../../components/ui/Button.jsx";
import PageHeader from "../../../components/ui/PageHeader.jsx";
import StatusPill from "../../../components/ui/StatusPill.jsx";

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

      <Card>
        <div className="divide-y divide-slate-200">
          {evaluations.map((ev) => (
            <Link
              key={ev.id}
              to={`/evaluations/${ev.id}`}
              className="flex items-center justify-between py-4 hover:bg-slate-50 px-2 rounded-lg transition"
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
        </div>
      </Card>
    </div>
  );
}
