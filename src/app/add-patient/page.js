"use client"
import React, { useState } from 'react';
import NavBar from '../home/navbar-auth';
import "../globals.css";
import AddPatientForm from './addpatient';

export default function PatientPage() {
    const [isPatientAdded, setIsPatientAdded] = useState(false);
    const [patientData, setPatientData] = useState(null);

    const handleAddPatient = async (patientData) => {
        try {
            const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/patient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            if (response.ok && response.status === 201) {
                const data = await response.json();
                setPatientData(data); // Guarda los datos del paciente
                setIsPatientAdded(true); // Actualiza el estado para indicar que el paciente se añadió
            } else {
                throw new Error('Error al crear el paciente');
            }
        } catch (error) {
            console.error(error.message);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };

    return (
        <div>
            <NavBar />
            {!isPatientAdded ? (
                <AddPatientForm onAddPatient={handleAddPatient} />
            ) : (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-20">
                    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">Paciente agregado exitosamente</h2>
                    <p className='text-3xl text-center text-gray-800 mb-6'>Detalles del paciente:</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Nombre: {patientData?.name}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Especie: {patientData?.species}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Raza: {patientData?.race}</p>
                    <p className='text-xl text-center text-gray-800 mb-6'>Edad: {patientData?.age} años</p>
                    <a href="#" onClick={(e) => {e.preventDefault();window.location.reload();}} className="text-xl text-center text-gray-800 mb-6">
                    Volver
                    </a>
                </div>
            )}
        </div>
    );
}