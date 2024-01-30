import React, { useState, useEffect } from 'react';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Si decides enviar el total de citas desde el backend

  const appointmentsPerPage = 5; // Número de citas por página

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://cheerful-hare-vestments.cyclic.app
        /users/appointments?page=${currentPage}&limit=${appointmentsPerPage}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener las citas');
        }
        const data = await response.json();
        setAppointments(data.appointments); // Asumiendo que la respuesta incluye las citas en un campo 'appointments'
        setTotalPages(data.totalPages); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAppointments();
  }, [currentPage]); // Dependencia de currentPage para recargar citas al cambiar la página


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://cheerful-hare-vestments.cyclic.app
/appointments/${id}`, {
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

   // Función para cambiar de página
   const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                <p className="text-sm text-gray-500">Teléfono: {appointment.phone}</p>
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
        {/* Controles de paginación */}
        <div className="flex justify-center mt-4">
          {[...Array(totalPages).keys()].map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              className={`mx-1 px-3 py-1 border rounded ${number + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default AppointmentsList;
