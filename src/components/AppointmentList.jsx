import React from 'react';
import { cancelAppointment } from '../utils/appointmentUtils';
import { Calendar, Clock, User, Phone, Languages, MessageSquare, X } from 'lucide-react';

const AppointmentList = ({ appointments, onAppointmentCanceled }) => {
  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const success = cancelAppointment(id);
      if (success && onAppointmentCanceled) {
        onAppointmentCanceled(id);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No upcoming appointments.</p>
        <p className="text-gray-400 text-sm mt-2">Your scheduled appointments will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{appointment.contactNumber}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{formatDate(appointment.date)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{formatTime(appointment.time)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{appointment.language}</span>
                </div>
                
                <div className="flex items-start space-x-2 md:col-span-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{appointment.reason}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 lg:mt-0 lg:ml-6">
              <button
                onClick={() => handleCancel(appointment.id)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg 
                         hover:bg-red-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;