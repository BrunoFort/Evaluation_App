import { useEmployees } from "../hooks/useEmployees";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import { EmployeeTable } from "../components/EmployeeTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EmployeesList() {
  const { employees, loading } = useEmployees();
  const { remove } = useDeleteEmployee();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>

        <Button asChild>
          <Link to="/employees/create">New Employee</Link>
        </Button>
      </div>

      <EmployeeTable employees={employees} onDelete={remove} />
    </div>
  );
}
