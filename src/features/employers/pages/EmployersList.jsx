import { useEmployers } from "../hooks/useEmployers";
import { useDeleteEmployer } from "../hooks/useDeleteEmployer";
import { EmployerTable } from "../components/EmployerTable";
import Button from "/src/components/ui/Button.jsx";;
import { Link } from "react-router-dom";

export default function EmployersList() {
  const { employers, loading } = useEmployers();
  const { remove } = useDeleteEmployer();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employers</h1>

        <Button asChild>
          <Link to="/employers/create">New Employer</Link>
        </Button>
      </div>

      <EmployerTable employers={employers} onDelete={remove} />
    </div>
  );
}
