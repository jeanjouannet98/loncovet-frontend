"use client"
import React, { useState, useEffect } from 'react';
import AddPatientForm from '../add-patient/addpatient'; // Asume que este componente ya existe y funciona correctamente

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/patient`);
        if (!response.ok) {
          throw new Error('Error al obtener la lista de pacientes');
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  const handleUpdate = (patient) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const handleDelete = async (patientId) => {
    try {
      const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/patient/${patientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el paciente');
      }

      setPatients(patients.filter(p => p._id !== patientId));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientUpdate = async (patientData) => {
    try {
      const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/patient/${currentPatient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el paciente');
      }

      const updatedPatient = await response.json();
      setPatients(patients.map(p => p._id === currentPatient._id ? updatedPatient : p));
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="container mx-auto my-8">
      <table className="table-auto w-full">
        <thead className="bg-white">
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Especie</th>
            <th className="px-4 py-2 border">Edad</th>
            <th className="px-4 py-2 border">Raza</th>
            <th className="px-4 py-2 border">Modificar</th>
            <th className="px-4 py-2 border">Eliminar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient) => (
            <tr key={patient._id} className="bg-white">
              <td className="border px-4 py-2">{patient.name}</td>
              <td className="border px-4 py-2">{patient.species}</td>
              <td className="border px-4 py-2">{patient.age} años</td>
              <td className="border px-4 py-2">{patient.race}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleUpdate(patient._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  Modificar
                </button>
              </td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(patient._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <AddPatientForm 
              onAddPatient={handlePatientUpdate} 
              initialData={currentPatient} 
            />
            <button onClick={() => setIsModalOpen(false)} className="modal-close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientsList;
