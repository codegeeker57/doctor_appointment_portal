import React, { useState, useEffect } from 'react';
import { getAppointments } from '../utils/appointmentUtils';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';

const AppointmentSection = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const handleAppointmentSaved = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleAppointmentCanceled = (canceledId) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== canceledId));
  };

  return (
    <section id="appointment" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Book an Appointment</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule your visit with our expert doctors. Fill out the form below and we'll 
            confirm your appointment within 24 hours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AppointmentForm onAppointmentSaved={handleAppointmentSaved} />
          
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Upcoming Appointments
            </h3>
            <AppointmentList 
              appointments={appointments}
              onAppointmentCanceled={handleAppointmentCanceled}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;