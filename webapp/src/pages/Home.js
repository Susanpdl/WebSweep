import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Trash2, Mail, Zap, Users, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-br from-primary-100 via-white to-secondary-100 overflow-hidden">
        {/* Abstract SVG background */}
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-20 pointer-events-none" width="900" height="400" fill="none" viewBox="0 0 900 400">
          <ellipse cx="450" cy="200" rx="400" ry="120" fill="#a5b4fc" />
          <ellipse cx="450" cy="250" rx="300" ry="80" fill="#f472b6" />
        </svg>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl mx-auto">
          {/* Hero Text */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-lg">
              Wipe Your <span className="text-primary-600">Web Surfing Blueprint</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">
              WebSweep helps you reduce your digital footprint and minimize spam by removing your browsing data from third parties.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-4 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 transition-colors text-lg text-center"
            >
              Get Started
            </Link>
          </div>
          {/* Hero Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-80 h-64 bg-white rounded-3xl shadow-2xl border-4 border-primary-100 flex flex-col items-center justify-center">
              <svg width="120" height="120" fill="none" viewBox="0 0 120 120" className="absolute -top-8 left-1/2 -translate-x-1/2">
                <circle cx="60" cy="60" r="60" fill="#6366f1" opacity="0.15" />
                <ShieldCheck x="30" y="30" width="60" height="60" className="text-primary-600 mx-auto" />
              </svg>
              <div className="mt-16 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Privacy, Swept Clean</h3>
                <p className="text-gray-500 text-sm">Analyze, control, and sweep your web data in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="flex flex-col items-center bg-primary-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <ShieldCheck className="h-12 w-12 text-primary-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Install Extension</h3>
              <p className="text-gray-600 text-sm">Add our browser extension to start analyzing your browsing data securely.</p>
            </div>
            <div className="flex flex-col items-center bg-secondary-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Trash2 className="h-12 w-12 text-secondary-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Analyze & Sweep</h3>
              <p className="text-gray-600 text-sm">See what data is stored about you and request removal from third parties.</p>
            </div>
            <div className="flex flex-col items-center bg-green-50 rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Mail className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Reduce Spam</h3>
              <p className="text-gray-600 text-sm">Minimize unwanted emails and take control of your digital privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why WebSweep?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Zap className="h-12 w-12 text-yellow-500 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Fast & Easy</h3>
              <p className="text-gray-600 text-sm">Get started in minutes and sweep your data with just a few clicks.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <Users className="h-12 w-12 text-blue-500 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Privacy First</h3>
              <p className="text-gray-600 text-sm">Your privacy is our top priority. You control your data, always.</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow hover:scale-105 transition-transform">
              <ShieldCheck className="h-12 w-12 text-green-600 mb-3" />
              <h3 className="font-semibold text-lg text-gray-800 mb-1">Secure & Transparent</h3>
              <p className="text-gray-600 text-sm">We use industry-leading security and are transparent about our process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Star className="mx-auto h-10 w-10 text-yellow-400 mb-2" />
          <blockquote className="text-xl italic text-gray-700 mb-4">"WebSweep made it so easy to clean up my digital footprint. I feel safer and get way less spam!"</blockquote>
          <div className="text-gray-900 font-semibold">— Happy User</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} WebSweep. All rights reserved.
      </footer>
    </div>
  );
};

export default Home; 