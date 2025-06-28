import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-newtifi-teal/20 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-newtifi-navy mb-4">Contact NewTIFI</h2>
          <p className="text-gray-700 mb-6">Reach out for inquiries, partnerships, or feedback. We value your input and will respond promptly.</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-newtifi-teal font-semibold">Email:</span>
              <a href="mailto:info@newtifi.com" className="text-newtifi-navy hover:underline">info@newtifi.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-newtifi-teal font-semibold">Location:</span>
              <span className="text-gray-700">Luxembourg</span>
            </div>
          </div>
        </div>
        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-newtifi-navy/20 p-8">
          <h2 className="text-xl font-semibold text-newtifi-navy mb-6">Send us a message</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your full name" required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select id="role" name="role" required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal">
                <option value="">Select your role or position</option>
                <option value="researcher">Researcher</option>
                <option value="industry">Industry Professional</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us about your inquiry, partnership interest, or feedback..." required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-newtifi-teal"></textarea>
            </div>
            <button type="submit" className="w-full bg-newtifi-navy text-white rounded-md py-3 font-semibold hover:bg-newtifi-teal transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
} 