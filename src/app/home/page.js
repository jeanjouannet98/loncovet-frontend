"use client"
import React, { useState } from 'react';
import NavBar from "./navbar-auth.js";
import "../globals.css";
import AppointmentsList from '../appointment/appointment-list.js';

export default function Page() {
    return(
        <>
        <NavBar />
        <AppointmentsList />
        </>
    )
}