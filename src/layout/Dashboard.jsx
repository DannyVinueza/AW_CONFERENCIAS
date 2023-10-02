import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Obtén la función de cierre de sesión desde el contexto de autenticación

  const handleLogout = () => {
    // Llama a la función de cierre de sesión del contexto de autenticación
    logout();

    // Redirige a la página de inicio de sesión después de cerrar sesión
    navigate('/');
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Sistema de gestion de conferencias</h1>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <nav className="bg-gray-200 p-4">
        <div className="container mx-auto flex justify-center space-x-4">
          <Link to="/home/reservas" className="text-gray-700 hover:text-gray-900">
            Reservas
          </Link>
          <Link to="/home/conferencistas" className="text-gray-700 hover:text-gray-900">
            Conferencistas
          </Link>
          <Link to="/home/auditorios" className="text-gray-700 hover:text-gray-900">
            Auditorios
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
