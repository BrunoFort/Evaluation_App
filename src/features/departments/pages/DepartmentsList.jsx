import { useDepartments } from "../hooks/useDepartments";
import { useDeleteDepartment } from "../hooks/useDeleteDepartment";
import { DepartmentTable } from "../components/DepartmentTable";
import Button from "/src/components/ui/Button.jsx";;
import { Link } from "react-router-dom";

export default function DepartmentsList() {
  const { departments, loading } = useDepartments();
  const { remove } = useDeleteDepartment();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Departments</h1>

        <Button asChild>
          <Link to="/departments/create">New Department</Link>
        </Button>
      </div>

      <DepartmentTable departments={departments} onDelete={remove} />
    </div>
  );
}
