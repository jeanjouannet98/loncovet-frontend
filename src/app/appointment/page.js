"use client"
import React, { useState } from 'react';
import NavBar from "./navbar";
import AddAppointmentForm from "./appointment";
import "../globals.css";

export default function Page() {
    const [isAppointmentAdded, setIsAppointmentAdded] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('es-CL', options).split('/').reverse().join('-');
    };

    const handleAddAppointment = async (appointmentData) => {
        try {
            const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            if (response.ok && response.status === 201) {
                const data = await response.json();
                setAppointmentData(data); // Guarda los datos de la cita
                setIsAppointmentAdded(true); // Actualiza el estado para indicar que la cita se añadió
            } else {
                throw new Error('Error al crear la cita');
            }
        } catch (error) {
            console.error(error.message);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };

    return (
        <div>
            <NavBar />
            {!isAppointmentAdded ? (
                <AddAppointmentForm onAddAppointment={handleAddAppointment} />
            ) : (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-20">
                    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Cita agendada exitosamente</h2>
                    <p className='text-3xl text-center text-gray-800 mb-6'>Detalles de la cita:</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Nombre: {appointmentData?.name}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Apellido: {appointmentData?.lastname}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Teléfono: {appointmentData?.phone}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Día: {formatDate(appointmentData?.date)}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Hora: {appointmentData?.hour}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Se le llamará un día antes de su cita, si necesita mas detalles.</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Fono contacto: +569 12345678.</p>
                    <a href="#" onClick={(e) => {e.preventDefault();window.location.reload();}} className="text-xl text-center text-gray-800 mb-6">
                    Volver
                    </a>
                </div>
            )}
        </div>
    );
}

  