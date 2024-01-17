"use client";
import React, { useState } from 'react';
import { globalUrl } from './global.js';
import "./globals.css"

export default function Page() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const url = `${globalUrl}/user`; 
const credentials = { username, password };

const handleSubmit = async (e) => {
  e.preventDefault();

try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    window.location.href = '/home';
    console.log('Login exitoso');
  } else {
    // Manejo de errores
    console.log('Error en el login');
  }
} catch (error) {
  // Manejo de errores de red
  console.log('Error de conexión', error);
}
}
return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
