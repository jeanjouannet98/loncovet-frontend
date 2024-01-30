"use client";
import React from 'react';
import NavBar from '../home/navbar-auth';
import "../globals.css";

const ContactPage = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Contacto</h1>
        
        {/* Información de contacto de la clínica veterinaria */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Clínica Veterinaria Volcanes del sur</h2>
          <p className="mb-2"><strong>Dirección:</strong> Calle Ficticia 123, Loncoche, Chile</p>
          <p className="mb-2"><strong>Teléfono:</strong> +56 9 1234 5678</p>
          <p className="mb-2"><strong>Email:</strong> contacto@loncovet.cl</p>
          <p className="mb-2"><strong>Horario:</strong> Lunes a Viernes - 9am a 6pm</p>
        </div>

        {/* Información de contacto de la consultora */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Consultora de Desarrollo Loncovet</h2>
          <p className="mb-2"><strong>Nombre de la Consultora:</strong> Jean Iplacex</p>
          <p className="mb-2"><strong>Teléfono:</strong> +56 9 8765 4321</p>
          <p className="mb-2"><strong>Email:</strong> info@dev.com</p>
          <p className="mb-2"><strong>Web:</strong> www.dev.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
