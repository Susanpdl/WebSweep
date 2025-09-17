import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-br from-primary-100 via-white to-secondary-100 overflow-hidden">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight drop-shadow-lg">
          Contact <span className="text-primary-600">Us</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Have a question, feedback, or want to partner with us? We’d love to hear from you!
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col items-center md:items-start bg-primary-50 rounded-xl p-8 shadow mb-8 md:mb-0">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Info</h2>
            <div className="flex items-center mb-4 text-gray-700"><Mail className="mr-2 text-primary-600" /> support@websweep.com</div>
            <div className="flex items-center mb-4 text-gray-700"><Phone className="mr-2 text-primary-600" /> +1 (555) 123-4567</div>
            <div className="flex items-center text-gray-700"><MapPin className="mr-2 text-primary-600" /> 123 Privacy Lane, Internet City</div>
          </div>
          {/* Form */}
          <form className="col-span-2 bg-white rounded-xl p-8 shadow flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded mb-4">Thank you for reaching out! We’ll get back to you soon.</div>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  className="mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  className="mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={5}
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-primary-700 transition-colors"
                >
                  <Send className="h-5 w-5 mr-2" /> Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Datasweepr. All rights reserved.
      </footer>
    </div>
  );
};

export default Contact; 