import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as api from "../services/mockApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, name, email, role}

  useEffect(() => {
    const saved = api.getSessionUser();
    if (saved) setUser(saved);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    async login(email, password) {
      const u = await api.login(email, password);
      setUser(u);
      return u;
    },
    async register(payload) {
      const u = await api.register(payload);
      setUser(u);
      return u;
    },
    logout() {
      api.logout();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
