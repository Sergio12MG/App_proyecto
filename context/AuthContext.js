import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login as apiLogin, logout as apiLogout } from '../utils/auth';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Al cargar la app, verificar si existe un token
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Obtener el token desde SecureStore
                const token = await SecureStore.getItemAsync('userToken');
                // Si se encontró, la 'flag' de autenticación es verdadera
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error("Error al leer el token", e);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (correo, contrasena) => {
        // Se envuelve la llamada a la API para manejar el estado
        const data = await apiLogin(correo, contrasena);
        setIsAuthenticated(true);
        return data;
    };

    const logout = async () => {
        await apiLogout();
        setIsAuthenticated(false);
    };

    // Los valores que el proveedor hará disponibles para sus hijos
    const value = {
        isLoading,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};
