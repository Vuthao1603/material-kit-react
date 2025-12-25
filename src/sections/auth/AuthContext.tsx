// src/sections/auth/AuthContext.tsx
import { useState, useEffect, useContext, createContext } from 'react';

type Admin = {
    _id: string;
    email: string;
    role: string;
    name?: string;
};


type AuthContextType = {
    admin: Admin | null;
    loading: boolean;
    login: (data: { token: string; user: Admin }) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('admin');
        if (stored) setAdmin(JSON.parse(stored));
        setLoading(false);
    }, []);

    const login = (data: { token: string; user: Admin }) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.user));
        setAdmin(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)!;
