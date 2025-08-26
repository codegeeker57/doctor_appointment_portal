import React from 'react';
import { ArrowRight, Shield, Users, Award } from 'lucide-react';

const HeroSection = () => {
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="py-16 bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">Nagpur HealthCare Hospital</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Serving Nagpur, Maharashtra with world-class healthcare. Our expert doctors provide 
            compassionate, advanced medical care across specialties, ensuring your well-being is our priority.
          </p>
          
          <button 
            onClick={scrollToAppointment}
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg 
                     hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 
                     shadow-lg hover:shadow-xl font-semibold text-lg group"
          >
            Book an Appointment
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Care</h3>
            <p className="text-gray-600">World-class medical facilities with advanced technology and experienced professionals.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Highly qualified specialists with years of experience across various medical fields.</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Service</h3>
            <p className="text-gray-600">Comprehensive healthcare services with personalized treatment plans for every patient.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;