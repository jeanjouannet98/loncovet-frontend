"use client";
import NavBar from "./navbar"
import AddAppointmentForm from "./appointment"
import "../globals.css"

const handleAddAppointment = async (appointmentData) => {
  try {
    const response = await fetch(`${globalUrl}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      throw new Error('Error al crear la cita');
    }
    // Manejar la respuesta
  } catch (error) {
    console.error(error.message);
  }
};


export default function Page() {
    return (
        <div>
            <NavBar />
            <AddAppointmentForm onAddAppointment={handleAddAppointment} />
            <h1>Home</h1>
        </div>
    )
  }