"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundElements from "@/components/ui/BackgroundElements";

function CookiesPolicy() {
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
                className="text-3xl sm:text-4xl 
              mt-4 md:text-5xl lg:text-6xl font-black text-gray-900 mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Cookies Policy
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                Last Updated: December 14, 2025
              </p>
            </div>

            {/* Content */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-purple-200/50">
              <div className="space-y-6 sm:space-y-8 text-gray-700">
                {/* What Are Cookies */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      1
                    </span>
                    What Are Cookies?
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    Cookies are small text files that are placed on your device
                    when you visit our website. They help us provide you with a
                    better experience by remembering your preferences,
                    understanding how you use our site, and improving our
                    services.
                  </p>
                </section>

                {/* Types of Cookies */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      2
                    </span>
                    Types of Cookies We Use
                  </h2>
                  <div className="space-y-4 sm:space-y-5 ml-0 sm:ml-13">
                    {/* Essential Cookies */}
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                          A
                        </span>
                        Essential Cookies
                      </h3>
                      <p className="text-sm sm:text-base mb-2">
                        These cookies are necessary for the website to function
                        properly. They enable core functionality such as
                        security, network management, and accessibility.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>Session management</li>
                        <li>Authentication and security</li>
                        <li>Load balancing</li>
                      </ul>
                    </div>

                    {/* Functional Cookies */}
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200/50">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white text-xs font-black">
                          B
                        </span>
                        Functional Cookies
                      </h3>
                      <p className="text-sm sm:text-base mb-2">
                        These cookies allow us to remember choices you make and
                        provide enhanced, personalized features.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>Language preferences</li>
                        <li>User preferences and settings</li>
                        <li>Registration form data</li>
                      </ul>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/50">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
                          C
                        </span>
                        Analytics Cookies
                      </h3>
                      <p className="text-sm sm:text-base mb-2">
                        These cookies help us understand how visitors interact
                        with our website by collecting and reporting information
                        anonymously.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>Page visit statistics</li>
                        <li>Traffic sources</li>
                        <li>User behavior patterns</li>
                      </ul>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-200/50">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white text-xs font-black">
                          D
                        </span>
                        Marketing Cookies
                      </h3>
                      <p className="text-sm sm:text-base mb-2">
                        These cookies track your online activity to help
                        advertisers deliver more relevant advertising.
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                        <li>Social media integration</li>
                        <li>Advertising campaigns</li>
                        <li>Conversion tracking</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      3
                    </span>
                    Third-Party Cookies
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <p className="text-sm sm:text-base leading-relaxed">
                      We may also use third-party cookies from trusted partners:
                    </p>
                    <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
                      <li>Google Analytics for website analytics</li>
                      <li>Social media platforms for sharing functionality</li>
                      <li>Payment processors for secure transactions</li>
                      <li>Email service providers for communications</li>
                    </ul>
                  </div>
                </section>

                {/* Managing Cookies */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      4
                    </span>
                    How to Manage Cookies
                  </h2>
                  <div className="space-y-3 sm:space-y-4 ml-0 sm:ml-13">
                    <p className="text-sm sm:text-base leading-relaxed">
                      You can control and manage cookies in several ways:
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                          Browser Settings
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                          Most browsers allow you to refuse or accept cookies,
                          delete existing cookies, and set preferences for
                          certain websites. Check your browser's help section
                          for instructions.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                          Cookie Preferences
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed">
                          When you first visit our website, you'll see a cookie
                          banner allowing you to accept or customize your cookie
                          preferences. You can change these settings at any
                          time.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                          Opt-Out Links
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                          <li>
                            Google Analytics:{" "}
                            <a
                              href="https://tools.google.com/dlpage/gaoptout"
                              className="text-purple-600 hover:text-pink-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Opt-out Browser Add-on
                            </a>
                          </li>
                          <li>
                            Digital Advertising Alliance:{" "}
                            <a
                              href="http://optout.aboutads.info/"
                              className="text-purple-600 hover:text-pink-600 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Consumer Choice Page
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Impact of Disabling */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      5
                    </span>
                    Impact of Disabling Cookies
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    Please note that disabling cookies may affect your
                    experience on our website. Essential cookies cannot be
                    disabled as they are necessary for the website to function.
                    Disabling other cookies may result in limited functionality,
                    such as:
                  </p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base mt-3 ml-0 sm:ml-13">
                    <li>Loss of personalized settings</li>
                    <li>Inability to complete registration</li>
                    <li>Repeated cookie consent prompts</li>
                    <li>Limited social media integration</li>
                  </ul>
                </section>

                {/* Updates */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      6
                    </span>
                    Updates to This Policy
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    We may update this Cookies Policy from time to time to
                    reflect changes in technology, legislation, or our business
                    practices. We encourage you to review this page periodically
                    for the latest information on our cookie practices.
                  </p>
                </section>

                {/* Contact */}
                <section>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-base font-black">
                      7
                    </span>
                    Contact Us
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed ml-0 sm:ml-13">
                    If you have any questions about our use of cookies, please
                    contact us at:
                  </p>
                  <div className="mt-3 sm:mt-4 ml-0 sm:ml-13 p-4 sm:p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                    <p className="text-sm sm:text-base">
                      <strong>Email:</strong> mindbenders@cgcuniversity.i
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

export default CookiesPolicy;
