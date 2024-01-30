"use client";
import React, { useState } from 'react';
import "../globals.css"

export default function Page() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`; 
const credentials = { username, password };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage('');

try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('userUuid', data.user._id);
    window.location.href = '/home';
  } else {
    // Manejo de errores
    setErrorMessage('Usuario o contraseña incorrecta');
    console.log('Error en el login');
  }
} catch (error) {
  // Manejo de errores de red
  setErrorMessage('Error de conexión');
  console.log('Error de conexión', error);
}
}
return (
  <div className="flex items-center justify-center h-screen">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1 className="text-xl block text-gray-700 text-sm font-bold mb-2">Loncovet - Inicio Sesión</h1>
    {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Usuario
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" 
          type="text" 
          placeholder="Usuario"
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" 
          type="password" 
          placeholder="******************"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Iniciar Sesión
        </button>
      </div>
    </form>
  </div>
);
};
