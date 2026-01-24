export const mockApi = {
  getEmployees: async () => {
    return [
      { id: 1, name: "John Doe", role: "Employee" },
      { id: 2, name: "Sarah Miller", role: "Manager" },
    ];
  },

  getEvaluations: async () => {
    return [
      { id: 1, employeeId: 1, average: 4.5 },
      { id: 2, employeeId: 2, average: 4.8 },
    ];
  },

  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};
