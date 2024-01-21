"use client";
import NavBar from "./navbar"
import AddAppointmentForm from "./appointment"
import "../globals.css"
import AppointmentsList from "./appointment-list";

const handleAddAppointment = async (appointmentData) => {
  console.log('Enviando cita:', appointmentData); 
  try {
    const response = await fetch(`http://localhost:3000/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      page.alert('Error al crear la cita');
      throw new Error('Error al crear la cita');
    }
    page.alert('Cita creada exitosamente');
  } catch (error) {
    console.error(error.message);
  }
};


export default function Page() {
    return (
        <div>
            <NavBar />
            <AddAppointmentForm onAddAppointment={handleAddAppointment} />
            <AppointmentsList />
        </div>
    )
  }