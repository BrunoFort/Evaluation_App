import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // MOCK login
    if (email === "admin@company.com") {
      setUser({ name: "Admin", role: "Admin" });
    } else if (email === "manager@company.com") {
      setUser({ name: "Manager", role: "Manager" });
    } else {
      setUser({ name: "Employee", role: "Employee" });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
