import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalApiUrl } from "@/functions/getLocalIP";

interface User {
    type: "employee"; 
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: { children: ReactNode}) {
    const [authError, setAuthError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const API_URL = await getLocalApiUrl(5000, "AUTH_API_URL");
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                setAuthError(data.message || "Login failed");
                return false;
            }
    
            setUser({ type: "employee" });

            await AsyncStorage.setItem("token", data.token);
            
            return true;
        } catch (error) {
            console.error("Error logging in:", error);
            return false;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;