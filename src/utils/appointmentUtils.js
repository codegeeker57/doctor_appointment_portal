export const getAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
  } catch (error) {
    console.error('Error parsing appointments:', error);
    return [];
  }
};

export const saveAppointment = (appointment) => {
  try {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointment,
      id: Date.now(),
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    return newAppointment;
  } catch (error) {
    console.error('Error saving appointment:', error);
    throw new Error('Failed to save appointment');
  }
};

export const cancelAppointment = (id) => {
  try {
    const appointments = getAppointments();
    const filteredAppointments = appointments.filter(appointment => appointment.id !== id);
    localStorage.setItem('appointments', JSON.stringify(filteredAppointments));
    return true;
  } catch (error) {
    console.error('Error canceling appointment:', error);
    return false;
  }
};

export const isSlotTaken = (doctor, date, time) => {
  const appointments = getAppointments();
  return appointments.some(appointment => 
    appointment.doctor === doctor && 
    appointment.date === date && 
    appointment.time === time
  );
};

export const validateAppointmentForm = (formData) => {
  const { patientName, contactNumber, doctor, date, time, language, reason } = formData;

  if (!patientName?.trim()) {
    return { isValid: false, error: 'Patient name is required.' };
  }

  if (!contactNumber?.trim()) {
    return { isValid: false, error: 'Contact number is required.' };
  }

  if (!/^[0-9]{10}$/.test(contactNumber)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
  }

  if (!doctor) {
    return { isValid: false, error: 'Please select a doctor.' };
  }

  if (!date) {
    return { isValid: false, error: 'Please select an appointment date.' };
  }

  const today = new Date().toISOString().split('T')[0];
  if (date < today) {
    return { isValid: false, error: 'Please select a valid date (today or future).' };
  }

  if (!time) {
    return { isValid: false, error: 'Please select an appointment time.' };
  }

  if (!language) {
    return { isValid: false, error: 'Please select a preferred language.' };
  }

  if (!reason?.trim()) {
    return { isValid: false, error: 'Please provide a reason for the visit.' };
  }

  if (isSlotTaken(doctor, date, time)) {
    return { isValid: false, error: 'This time slot is already booked for the selected doctor.' };
  }

  return { isValid: true };
};