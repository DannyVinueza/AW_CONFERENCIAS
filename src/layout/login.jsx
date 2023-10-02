import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; // Importa el contexto de autenticación

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtiene la función de inicio de sesión del contexto de autenticación
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a la función de inicio de sesión del contexto de autenticación
      await login(formData);
      
      // Redirige a la página de dashboard después de iniciar sesión exitosamente
      navigate('/home');
    } catch (error) {
      // Manejo de errores de inicio de sesión
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-1/2 h-screen bg-white flex justify-center items-center">
        <div className="md:w-4/5 sm:w-full">
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">BIENVENIDO DE NUEVO</h1>
          <small className="text-gray-400 block my-4 text-sm">Bienvenido!! Por favor, Ingresa tus credenciales</small>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
              />
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********************"
                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="my-4">
              <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar Sesión</button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">O</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-sm flex justify-between items-center">
            <p>¿No tienes una cuenta?</p>
            <Link to="/registrar" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrar</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
