import React, { useState, useEffect } from 'react';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const uuid = localStorage.getItem('userUuid');
        const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/users/appointments/${uuid}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener las citas');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://cheerful-hare-vestments.cyclic.app/appointments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold text-center text-white-800 mb-8">Citas</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <ul className="divide-y divide-gray-300">
          {appointments.map(appointment => (
            <li key={appointment._id} className="p-4 hover:bg-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Nombre: {appointment.name} {appointment.lastname}</p>
                <p className="text-sm text-gray-500">RUT: {appointment.rut}</p>
                <p className="text-sm text-gray-500">Telefono: {appointment.phone}</p>
                <p className="text-sm text-gray-500">Fecha: {formatDate(appointment.date)}</p>
                <p className="text-sm text-gray-500">Hora: {appointment.hour}</p>
              </div>
              <button 
                onClick={() => handleDelete(appointment._id)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentsList;
