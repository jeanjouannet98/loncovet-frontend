"use client"
import React, { useState } from "react"
import NavBar from "../home/navbar-auth"
import "../globals.css"
import PatientsList from "./patient-list"

export default function Page(){
    return(
        <div>
            <NavBar />
            <PatientsList />
        </div>
    )
}