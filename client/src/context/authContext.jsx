import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed);
      } catch {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  function saveAuthData(data) {
    // data: { _id, email, accessToken }
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
    localStorage.setItem("accessToken", data.accessToken);
  }

  async function loginHandler(email, password) {
    const result = await authService.login(email, password);
    saveAuthData(result);
  }

  async function registerHandler(email, password) {
    const result = await authService.register(email, password);
    saveAuthData(result);
  }

  async function logoutHandler() {
    try {
      await authService.logout();
    } catch (err) {
      
      console.warn(err.message);
    }

    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("accessToken");
  }

  const contextValue = {
    user,
    isAuthenticated: !!user,
    login: loginHandler,
    register: registerHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}