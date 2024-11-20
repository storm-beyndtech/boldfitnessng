import { createContext, useContext, useLayoutEffect, useState } from "react";
import { sendRequest } from "../util/sendRequest";

interface AuthContextProps {
  user: any;
  token: string | null;
  fetching: boolean;
  login: (userData: any) => Promise<void>;
  fetchUser: (token: any) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken") || null,
  );
  const [fetching, setFetching] = useState(true);

  // Login and store token in localStorage
  const login = async (userData: any) => {
    const { token, user } = userData;

    if (token) {
      setToken(token);
      localStorage.setItem("authToken", token);

      // Set the user in state
      setUser(user);
    } else {
      console.error("Login failed: No token received");
    }
  };

  // Logout and remove the token from localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    setFetching(false);
  };

  // Check token in localStorage on page load/refresh and fetch user
  useLayoutEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setFetching(false);
    }
  }, []);

  // Fetch the user data using the token
  const fetchUser = async (token: string | null) => {
    if (!token) return setFetching(false);
    try {
      setFetching(true);
      const res = await sendRequest("/auth/me", "GET", null);
      setUser(res.user);
    } catch (error: any) {
      console.error("Failed to fetch user:", error.message);
      logout();
    } finally {
      setFetching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        fetching,
        login,
        logout,
        fetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const contextData = useAuthContext;
