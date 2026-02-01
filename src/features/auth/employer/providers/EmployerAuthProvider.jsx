import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabaseClient";

const EmployerAuthContext = createContext(null);

export function EmployerAuthProvider({ children }) {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        setEmployer({
          role: "employer",
          email: session.user.email,
          employerId: session.user.id,
        });
      }

      setLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setEmployer({
            role: "employer",
            email: session.user.email,
            employerId: session.user.id,
          });
        } else {
          setEmployer(null);
        }
      }
    );

    unsubscribe = listener.subscription.unsubscribe;

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  function login(data) {
    setEmployer(data);
  }

  async function logout() {
    await supabase.auth.signOut();
    setEmployer(null);
  }

  const value = useMemo(
    () => ({
      employer,
      isAuthenticated: !!employer,
      loading,
      login,
      logout,
    }),
    [employer, loading]
  );

  return (
    <EmployerAuthContext.Provider value={value}>
      {children}
    </EmployerAuthContext.Provider>
  );
}

export function useEmployerAuth() {
  return useContext(EmployerAuthContext);
}

