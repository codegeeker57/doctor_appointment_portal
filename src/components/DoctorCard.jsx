import React from 'react';
import { User, Clock, GraduationCap, Building, IndianRupee } from 'lucide-react';

const DoctorCard = ({ doctor, specialty }) => {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
          <p className="text-blue-600 font-semibold">{specialty}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">Experience: {doctor.experience}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{doctor.qualifications}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Building className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">{doctor.hospital}</span>
        </div>
        
        <div className="flex items-center text-green-600 font-semibold">
          <IndianRupee className="h-4 w-4 mr-1" />
          <span className="text-sm">{doctor.consultation_fee.replace('₹', '')}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{doctor.bio}</p>
      
      <button 
        onClick={scrollToAppointment}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 
                 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;