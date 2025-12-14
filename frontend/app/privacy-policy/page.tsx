"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen w-full relative overflow-hidden">
        <div className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mt-4 mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Last Updated: December 14, 2025
              </p>
            </div>

            {/* Content */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-purple-200/50">
              <div className="space-y-6 sm:space-y-8 text-gray-700">
                {/* Introduction */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      1
                    </span>
                    Introduction
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    Welcome to SAHITYAM 2026. We respect your privacy and are
                    committed to protecting your personal data. This privacy
                    policy will inform you about how we handle your personal
                    data when you visit our website and register for our
                    literary festival.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      2
                    </span>
                    Information We Collect
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        Personal Information
                      </h3>
                      <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>
                          Name and contact information (email, phone number)
                        </li>
                        <li>
                          College/Institution details and academic information
                        </li>
                        <li>
                          Event registration details and participation
                          preferences
                        </li>
                        <li>Payment information for event registration</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        Technical Information
                      </h3>
                      <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                        <li>IP address and browser type</li>
                        <li>Device information and operating system</li>
                        <li>Pages visited and time spent on our website</li>
                        <li>Referring website and clickstream data</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      3
                    </span>
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base ml-0 sm:ml-13">
                    <li>To process your event registration and payments</li>
                    <li>To communicate important updates about the festival</li>
                    <li>To improve our website and user experience</li>
                    <li>To send promotional materials (with your consent)</li>
                    <li>To ensure security and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      4
                    </span>
                    Data Security
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    We have implemented appropriate security measures to prevent
                    your personal data from being accidentally lost, used, or
                    accessed in an unauthorized way. We use industry-standard
                    encryption for sensitive data and regularly review our
                    security procedures.
                  </p>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      5
                    </span>
                    Data Retention
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    We will only retain your personal data for as long as
                    necessary to fulfill the purposes we collected it for,
                    including for legal, accounting, or reporting requirements.
                    Registration data will be retained for up to 3 years after
                    the festival.
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      6
                    </span>
                    Your Rights
                  </h2>
                  <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base ml-0 sm:ml-13">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request erasure of your data</li>
                    <li>Object to processing of your data</li>
                    <li>Request transfer of your data</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      7
                    </span>
                    Cookies and Tracking
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    We use cookies and similar tracking technologies to track
                    activity on our website and store certain information. You
                    can instruct your browser to refuse all cookies or to
                    indicate when a cookie is being sent. For more information,
                    please see our Cookies Policy.
                  </p>
                </section>

                {/* Contact */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      8
                    </span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    If you have any questions about this Privacy Policy or our
                    data practices, please contact us at:
                  </p>
                  <div className="mt-3 sm:mt-4 ml-0 sm:ml-13 p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <p className="text-sm sm:text-base">
                      <strong>Email:</strong> mindbenders@cgcuniversity.in
                    </p>
                    <p className="text-sm sm:text-base mt-1 sm:mt-2">
                      <strong>Phone:</strong> +91 7681951539
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
