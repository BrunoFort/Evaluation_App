import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";

const EmployerAuthContext = createContext(null);

export function EmployerAuthProvider({ children }) {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Carrega sessão persistida do Supabase ao iniciar o app
  useEffect(() => {
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

    // 🔁 Listener para login/logout automático
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

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔐 Login manual (usado após signInWithPassword)
  function login(data) {
    setEmployer(data);
  }

  // 🚪 Logout real
  async function logout() {
    await supabase.auth.signOut();
    setEmployer(null);
  }

  return (
    <EmployerAuthContext.Provider
      value={{
        employer,
        isAuthenticated: !!employer,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </EmployerAuthContext.Provider>
  );
}

export function useEmployerAuth() {
  return useContext(EmployerAuthContext);
}
