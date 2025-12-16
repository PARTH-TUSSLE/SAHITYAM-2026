"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

function TermsOfService() {
  return (
    <>
      <Navbar />
      <BackgroundElements />
      <div className="min-h-screen w-full relative overflow-hidden">
        <div className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-16">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl 
              mt-4 lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Terms of Service
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Last Updated: December 14, 2025
              </p>
            </div>

            {/* Content */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-purple-200/50">
              <div className="space-y-6 sm:space-y-8 text-gray-700">
                {/* Acceptance */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      1
                    </span>
                    Acceptance of Terms
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    By accessing and using the SAHITYAM 2026 website and
                    registering for our literary festival, you accept and agree
                    to be bound by these Terms of Service. If you do not agree
                    with any part of these terms, you may not use our services.
                  </p>
                </section>

                {/* Registration */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      2
                    </span>
                    Event Registration
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <p className="text-sm sm:text-base leading-relaxed">
                      To participate in SAHITYAM 2026, you must:
                    </p>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>
                        Provide accurate and complete registration information
                      </li>
                      <li>
                        Be a currently enrolled student with valid college ID
                      </li>
                      <li>Pay the required registration fee</li>
                      <li>
                        Maintain the confidentiality of your account credentials
                      </li>
                      <li>Notify us immediately of any unauthorized access</li>
                    </ul>
                  </div>
                </section>

                {/* Payment Terms */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      3
                    </span>
                    Payment Terms
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
                      <li>
                        All registration fees must be paid in full at the time
                        of registration
                      </li>
                      <li>
                        Payment confirmation is required for event admission
                      </li>
                      <li>
                        Registration fees are non-refundable except in case of
                        event cancellation
                      </li>
                      <li>
                        We reserve the right to modify pricing with prior notice
                      </li>
                      <li>
                        Failed payments may result in registration cancellation
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Event Participation */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      4
                    </span>
                    Event Participation Rules
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <p className="text-sm sm:text-base leading-relaxed">
                      All participants must:
                    </p>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>
                        Conduct themselves in a respectful and professional
                        manner
                      </li>
                      <li>Follow all venue rules and regulations</li>
                      <li>
                        Present valid ID and registration proof upon request
                      </li>
                      <li>
                        Not engage in any disruptive or illegal activities
                      </li>
                      <li>
                        Respect intellectual property rights of all content
                      </li>
                      <li>
                        Comply with COVID-19 safety protocols if applicable
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Cancellation Policy */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      5
                    </span>
                    Cancellation and Refund Policy
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
                      <li>
                        Registrations cannot be cancelled once payment is
                        confirmed
                      </li>
                      <li>
                        No refunds will be issued for missed events or no-shows
                      </li>
                      <li>
                        In case of event cancellation by organizers, full refund
                        will be processed within 14 business days
                      </li>
                      <li>
                        Event schedules and speakers are subject to change
                        without refund eligibility
                      </li>
                      <li>Force majeure events do not guarantee refunds</li>
                    </ul>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      6
                    </span>
                    Intellectual Property
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    All content on the SAHITYAM 2026 website, including text,
                    graphics, logos, and images, is the property of SAHITYAM
                    2026 and protected by copyright laws. Unauthorized use,
                    reproduction, or distribution is strictly prohibited.
                    Participants retain rights to their own submissions but
                    grant us permission to showcase them during the festival.
                  </p>
                </section>

                {/* Photography and Recording */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      7
                    </span>
                    Photography and Recording
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    By participating in SAHITYAM 2026, you consent to being
                    photographed, filmed, or recorded during the event. These
                    materials may be used for promotional purposes, social
                    media, and future event marketing without additional
                    compensation or approval.
                  </p>
                </section>

                {/* Liability */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      8
                    </span>
                    Limitation of Liability
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    SAHITYAM 2026 and its organizers are not liable for any
                    injury, loss, damage, or theft that may occur during the
                    event. Participants attend at their own risk. We are not
                    responsible for any indirect, incidental, or consequential
                    damages arising from your participation.
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      9
                    </span>
                    Changes to Terms
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    We reserve the right to modify these Terms of Service at any
                    time. Changes will be effective immediately upon posting.
                    Your continued use of our services after changes constitutes
                    acceptance of the modified terms.
                  </p>
                </section>

                {/* Contact */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      10
                    </span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    If you have any questions about these Terms of Service,
                    please contact us at:
                  </p>
                  <div className="mt-3 sm:mt-4 ml-0 sm:ml-13 p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <p className="text-sm sm:text-base">
                      <strong>Email:</strong> mindbenders@cgcuniversity.org
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

export default TermsOfService;
