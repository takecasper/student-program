"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { mockUser } from "@/data/mockData";

type AuthContextType = {
  user: typeof mockUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const checkUserLoggedIn = async () => {
      try {
        // For demo purposes, we'll check if we have a mock session
        if (typeof window !== "undefined") {
          const hasSession = localStorage.getItem("mockSession");
          if (hasSession === "true") {
            setUser(mockUser);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation for demo
      if (email && password) {
        setUser(mockUser);

        // Store session in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("mockSession", "true");

          // Also set a cookie for the middleware
          document.cookie = "mockSession=true; path=/; max-age=86400";
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // In a real app, clear token from localStorage or cookies
    // localStorage.removeItem('token');

    // For demo purposes
    localStorage.removeItem("mockSession");
    setUser(null);
    router.push("/signin");
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
