import React, { createContext, useState, useContext, useEffect } from "react";
import { apiLogin, apiRegister, apiVerifyToken } from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // You can add logic here to verify the token with the backend on app load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const userProfile = await apiVerifyToken(token);
          setUser(userProfile);
        } catch (error) {
          console.error("Failed to verify token", error);
          logout(); // Log out on any error
        }
      } else {
        setUser(null);
      }
    };
    verifyToken();
  }, [token]);

  const login = async (credentials) => {
    const { token: newToken, user: newUser } = await apiLogin(credentials);
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
  };

  const register = async (credentials) => {
    const { token: newToken, user: newUser } = await apiRegister(credentials);
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { token, user, login, register, logout, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};