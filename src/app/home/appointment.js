import React, { useState } from 'react';

const AddAppointmentForm = ({ onAddAppointment }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      name,
      lastname,
      rut,
      phone,
      date
    };
    onAddAppointment(newAppointment);
    // Limpia el formulario
    setName('');
    setLastname('');
    setRut('');
    setPhone('');
    setDate('');
  };

  return (
    <>
    
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1 className="text-center text-3xl text-black font-bold mb-2">Agregar Cita</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
          Apellido
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
          RUT
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="rut"
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Telefono
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Fecha
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          id="date"
          type="date"
          min={Date.now()}
          value={date}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {/* Campos para lastname, rut, phone, y date siguiendo el mismo patrón */}
      {/* ... */}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agregar Cita
      </button>
    </form>
    </>
  );
};

export default AddAppointmentForm;
