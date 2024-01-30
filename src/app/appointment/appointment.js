import React, { useState, useEffect } from 'react';

const AddAppointmentForm = ({ onAddAppointment }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    rut: '',
    phone: '',
    date: '',
    hour: '',
  });
  const [errors, setErrors] = useState({});
  const [userUuid, setUserUuid] = useState('');


  const validateForm = () => {
    let formIsValid = true;
    let currentErrors = {};

    // Chequea cada campo y si está vacío, establece el error correspondiente
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        formIsValid = false;
        currentErrors[key] = 'Campo requerido';
      }
    }

    setErrors(currentErrors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Añade el UUID del usuario al objeto de la cita antes de enviar
      const appointmentData = {
        ...formData,
        user: userUuid,
      };
      onAddAppointment(appointmentData);
      // Restablece el formulario después de enviar
      setFormData({
        name: '',
        lastname: '',
        rut: '',
        phone: '',
        date: '',
        hour: '',
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-20">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Pide tu cita aqui!</h1>
      {Object.entries(formData).map(([key, value]) => (
        <div className="mb-4" key={key}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
            {key[0].toUpperCase() + key.slice(1)} {/* Convierte la primera letra en mayúscula */}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={key}
            name={key}
            type={key === 'date' ? 'date' : key === 'hour' ? 'time' : 'text'}
            value={value}
            onChange={handleChange}
          />
          {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agregar Cita
      </button>
    </form>
  );
};

export default AddAppointmentForm;

