import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "/src/lib/supabaseClient";

const EmployeeAuthContext = createContext(null);

export function EmployeeAuthProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        setEmployee({
          role: "employee",
          email: session.user.email,
          employeeId: session.user.id,
        });
      }

      setLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setEmployee({
            role: "employee",
            email: session.user.email,
            employeeId: session.user.id,
          });
        } else {
          setEmployee(null);
        }
      }
    );

    unsubscribe = listener.subscription.unsubscribe;

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  function login(data) {
    setEmployee(data);
  }

  async function logout() {
    await supabase.auth.signOut();
    setEmployee(null);
  }

  const value = useMemo(
    () => ({
      employee,
      isAuthenticated: !!employee,
      loading,
      login,
      logout,
    }),
    [employee, loading]
  );

  return (
    <EmployeeAuthContext.Provider value={value}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export function useEmployeeAuth() {
  return useContext(EmployeeAuthContext);
}
