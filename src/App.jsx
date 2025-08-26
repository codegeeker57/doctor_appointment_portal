import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DoctorsSection from './components/DoctorsSection';
import AppointmentSection from './components/AppointmentSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DoctorsSection />
        <AppointmentSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;