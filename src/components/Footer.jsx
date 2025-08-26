import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hospital Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold">Nagpur HealthCare Hospital</h3>
            </div>
            <p className="text-blue-100 mb-4">
              Providing world-class healthcare services in Nagpur, Maharashtra with 
              compassionate care and advanced medical technology.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">+91-712-2811400</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">info@nagpurhealthcare.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">Nagpur, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-blue-100">
              <li>• Emergency Care</li>
              <li>• Specialist Consultations</li>
              <li>• Surgical Procedures</li>
              <li>• Diagnostic Services</li>
              <li>• Preventive Care</li>
              <li>• Health Check-ups</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            &copy; 2025 Nagpur HealthCare Hospital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;