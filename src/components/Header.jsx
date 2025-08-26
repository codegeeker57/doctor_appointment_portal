import React from 'react';
import { Heart } from 'lucide-react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-400" />
          <h1 className="text-2xl font-bold">Nagpur HealthCare Hospital</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => scrollToSection('home')} 
            className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('doctors')} 
            className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Doctors
          </button>
          <button 
            onClick={() => scrollToSection('appointment')} 
            className="px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Book Appointment
          </button>
        </nav>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="p-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;