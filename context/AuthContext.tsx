"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// La interfaz User es la misma, ya que el backend es compartido.
export interface User {
  id: string;
  email: string;
  // No incluimos el password en el objeto de usuario del frontend por seguridad
  firstName: string;
  lastName: string;
  gender: "M" | "F" | string;
  phone: string;
  address: string;
  country: string;
  autonomousCommunity: string;
  province: string | null;
  professionalCategory: string;
  interests: string;
  verified: number;
  lastAccessIp: string | null;
  termsAccepted: number;
  infoAccepted: number;
  deviceIp: string;
  state: string;
  roleId: number; // Importante para el backoffice, para saber si es admin
  createdAt: string;
  updatedAt: string;
}

// El tipo de contexto no cambia
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean; // <-- Añadido: muy útil para el backoffice
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Un estado derivado para saber si el usuario es administrador
  // Asumimos que roleId 1 = Admin. ¡Ajústalo si es diferente!
  const isAdmin = user?.roleId === 1;

  // Al montar, cargamos el token desde localStorage si existe
  useEffect(() => {
    // Usamos un nombre de token específico para el backoffice para evitar conflictos
    const storedToken = localStorage.getItem("backofficeToken");

    if (storedToken) {
      setToken(storedToken);

      // Obtenemos el perfil del usuario con el token guardado
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // Si el token es inválido o ha expirado, lo limpiamos
            logout();
            return Promise.reject("Token inválido o expirado");
          }
          return res.json();
        })
        .then((data: User) => setUser(data))
        .catch((error) => {
          console.error("Error de autenticación:", error);
          // La función logout() ya limpia el estado y localStorage
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    // Guardamos el token en localStorage con un nombre específico
    localStorage.setItem("backofficeToken", newToken);
    setToken(newToken);
    setLoading(true);

    // Obtenemos el perfil del usuario con el nuevo token
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${newToken}` },
    })
      .then((res) => res.json())
      .then((data: User) => setUser(data))
      .catch((error) => {
        console.error("Error al obtener el perfil tras login:", error);
        logout(); // Si falla, cerramos sesión para limpiar todo
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("backofficeToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
