"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import "./globals.css"

export default function Page() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const url = `https://cheerful-hare-vestments.cyclic.app/users/login`; 
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
  <div className="m-20 flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-5xl text-gray-800 font-bold mb-6">Volcanes del Sur</h1>
    <div className="flex flex-col items-center space-y-4 border-4 border-solid m-10 p-10">
      <Link href="/login" className="text-lg text-blue-600 hover:text-blue-800 font-semibold">
          Inicia sesión aquí.
      </Link>
      <Link href="/appointment" className="text-lg text-blue-600 hover:text-blue-800 font-semibold">
          ¿Eres usuario? Pide tu hora aquí
      </Link>
    </div>
  </div>
);
};
