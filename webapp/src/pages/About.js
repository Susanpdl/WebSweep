import React from 'react';
import { Users, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-primary-100 via-white to-secondary-100 overflow-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-lg">
          About <span className="text-primary-600">WebSweep</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Our mission is to empower everyone to take control of their digital footprint and privacy. We believe your data belongs to you—and only you.
        </p>
      </section>

      {/* Team & Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="flex flex-col items-center bg-primary-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <ShieldCheck className="h-12 w-12 text-primary-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Privacy First</h3>
              <p className="text-gray-600 text-sm">We never sell your data. Your privacy is our top priority in everything we build.</p>
            </div>
            <div className="flex flex-col items-center bg-secondary-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Users className="h-12 w-12 text-secondary-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">User Empowerment</h3>
              <p className="text-gray-600 text-sm">We give you the tools to see, control, and sweep your data with ease.</p>
            </div>
            <div className="flex flex-col items-center bg-green-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Heart className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Transparency</h3>
              <p className="text-gray-600 text-sm">We’re open about our process and technology. No secrets, just service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} WebSweep. All rights reserved.
      </footer>
    </div>
  );
};

export default About; 