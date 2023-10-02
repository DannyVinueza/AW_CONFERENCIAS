import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crea un contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // El usuario autenticado
  const [loading, setLoading] = useState(true); // Estado para indicar si estamos cargando la autenticación

  // Función para iniciar sesión
  const login = async (formData) => {
    try {
      // Realiza la solicitud de inicio de sesión
      const url = `${import.meta.env.VITE_BACKEND_URL}/login`
      const response = await axios.post(url, formData);
      const userData = response.data;

      // Almacena el token en localStorage
      console.log("Hola")
      console.log(localStorage.setItem('token', response.data.token))
      localStorage.setItem('token', response.data.token);

      // Establece al usuario en el estado
      setUser(userData);
    } catch (error) {
      // Manejo de errores de inicio de sesión
      throw new Error(error.response.data.msg);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpia el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');

    // Limpia al usuario del estado
    setUser(null);
  };

  // Comprueba si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Realiza una solicitud al servidor para verificar la autenticación del token si es necesario
      // Puedes personalizar esto según tu lógica de autenticación

      // En este ejemplo, simplemente establecemos al usuario si hay un token en localStorage
      setUser({ token });
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
