"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <BackgroundElements />
      {/* Background with pattern overlay */}
      <div className="fixed inset-0  animate-gradient-shift -z-10"></div>

      {/* Decorative pattern overlay */}
      {/* Decorative pattern overlay removed */}

      {/* Main Content */}
      <div className="min-h-screen pt-24 pb-16 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Get In Touch
            </h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-pink-500 via-pink-500 to-pink-500 rounded-full mx-auto mb-6 shadow-lg shadow-pink-300/50"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Have questions about SAHITYAM 2026? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info Cards - Modern 3D Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Email Card */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-200/50 text-center h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-300/50 group-hover:shadow-xl group-hover:shadow-pink-400/60 transition-all duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                <a
                  href="mailto:contact@sahityam2026.com"
                  className="text-pink-600 hover:text-pink-700 font-semibold text-base transition-colors inline-block break-words"
                >
                  contact@sahityam2026.com
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-200/50 text-center h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-300/50 group-hover:shadow-xl group-hover:shadow-pink-400/60 transition-all duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                <a
                  href="tel:+911234567890"
                  className="text-pink-600 hover:text-pink-700 font-semibold text-base transition-colors inline-block"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-200/50 text-center h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-300/50 group-hover:shadow-xl group-hover:shadow-pink-400/60 transition-all duration-300">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Location
                </h3>
                <p className="text-gray-700 font-semibold text-base leading-relaxed">
                  University Campus
                  <br />
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-2xl shadow-pink-100/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Send us a Message
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-pink-400 focus:bg-white outline-none transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-pink-400 focus:bg-white outline-none transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-pink-400 focus:bg-white outline-none transition-all duration-300"
                    placeholder="+91 123 456 7890"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-orange-400 focus:bg-white outline-none transition-all duration-300"
                    placeholder="Regarding SAHITYAM 2026"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-gray-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-pink-400 focus:bg-white outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="group relative w-full md:w-auto px-12 py-4 bg-gradient-to-r from-pink-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/60 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12"></div>
              </button>
            </form>

            {/* Social Media - Below Form */}
            <div className="mt-12 text-center">
              <h3 className="text-gray-900 font-bold text-lg mb-6">
                Connect With Us
              </h3>
              <div className="flex gap-5 justify-center">
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-400 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-pink-200/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-6 h-6 relative z-10 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-400 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-pink-200/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-6 h-6 relative z-10 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-pink-400 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg hover:shadow-pink-200/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-6 h-6 relative z-10 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
