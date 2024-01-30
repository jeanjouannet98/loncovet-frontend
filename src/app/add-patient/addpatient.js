import React, { useState } from 'react';

const AddPatientForm = ({ onAddPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    race: '',
    age: '',
    historyDiagnosis: '',
    historyDate: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formIsValid = true;
    let currentErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== 'race') { // Suponiendo que 'race' no es obligatorio
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
      const patientData = {
        name: formData.name,
        species: formData.species,
        race: formData.race,
        age: formData.age,
        history: {
          diagnosis: formData.historyDiagnosis,
          date: formData.historyDate,
        },
      };
      onAddPatient(patientData);
      setFormData({
        name: '',
        species: '',
        race: '',
        age: '',
        historyDiagnosis: '',
        historyDate: '',
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-20">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Añadir Paciente</h1>
      {Object.entries(formData).map(([key, value]) => (
        <div className="mb-4" key={key}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
            {key[0].toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} {/* Convierte la primera letra en mayúscula y agrega espacios antes de las mayúsculas */}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={key}
            name={key}
            type={key.includes('Date') ? 'datetime-local' : 'text'}
            value={value}
            onChange={handleChange}
          />
          {errors[key] && <p className="text-red-500 text-xs italic">{errors[key]}</p>}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Añadir Paciente
      </button>
    </form>
  );
};

export default AddPatientForm;
