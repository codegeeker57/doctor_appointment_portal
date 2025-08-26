import React, { useState, useEffect } from 'react';
import { doctorProfessions } from '../data/doctorsData';
import { saveAppointment, validateAppointmentForm } from '../utils/appointmentUtils';
import { Calendar, Clock, User, Phone, Languages, MessageSquare } from 'lucide-react';

const AppointmentForm = ({ onAppointmentSaved }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    contactNumber: '',
    doctor: '',
    date: '',
    time: '',
    language: '',
    reason: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' }
  ];

  const languages = ['English', 'Hindi', 'Marathi'];

  const allDoctorOptions = doctorProfessions.medical_specialties.flatMap(specialty =>
    specialty.doctors.map(doctor => ({
      value: `${doctor.name} - ${specialty.specialty}`,
      label: `${doctor.name} - ${specialty.specialty} (${doctor.experience}, ${doctor.consultation_fee})`
    }))
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      const validation = validateAppointmentForm(formData);
      if (!validation.isValid) {
        setError(validation.error);
        return;
      }

      // Save appointment
      const savedAppointment = saveAppointment(formData);
      
      setSuccess(`Appointment booked successfully for ${formData.patientName} with ${formData.doctor} on ${formData.date} at ${formData.time}.`);
      
      // Reset form
      setFormData({
        patientName: '',
        contactNumber: '',
        doctor: '',
        date: '',
        time: '',
        language: '',
        reason: ''
      });

      // Notify parent component
      if (onAppointmentSaved) {
        onAppointmentSaved(savedAppointment);
      }

    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
      dateInput.setAttribute('min', today);
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-200 text-center font-medium">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 text-center font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Name */}
          <div>
            <label htmlFor="patientName" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User className="h-4 w-4 mr-2 text-blue-600" />
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 bg-white"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Phone className="h-4 w-4 mr-2 text-blue-600" />
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 bg-white"
              placeholder="Enter 10-digit mobile number"
              required
            />
          </div>
        </div>

        {/* Doctor Selection */}
        <div>
          <label htmlFor="doctor" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <User className="h-4 w-4 mr-2 text-blue-600" />
            Doctor & Specialty
          </label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all duration-200 bg-white"
            required
          >
            <option value="">Select Doctor and Specialty</option>
            {allDoctorOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div>
            <label htmlFor="date" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              Appointment Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 bg-white"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Clock className="h-4 w-4 mr-2 text-blue-600" />
              Appointment Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-all duration-200 bg-white"
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <Languages className="h-4 w-4 mr-2 text-blue-600" />
            Preferred Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all duration-200 bg-white"
            required
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
            Reason for Visit
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-all duration-200 bg-white resize-none"
            placeholder="Describe your medical concern"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 
                   transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl
                   disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
        >
          {isSubmitting ? 'Booking Appointment...' : 'Book Appointment Now'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;