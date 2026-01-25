"use client";

import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  type: string;
  link: string;
  image: string;
  isInstagram?: boolean;
  gradient: string;
}

// Our amazing partners
const partners: Partner[] = [
  {
    id: 1,
    name: "Lahori Zeera",
    type: "Beverage Partner",
    link: "https://lahorizeera.com",
    image: "/lahoriZeera.png",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
  },
  {
    id: 2,
    name: "The Little Hamper House",
    type: "Gifts Partner",
    link: "https://www.instagram.com/the_little_hamper_house?igsh=MXJmem1xaWFpemFuZw%3D%3D&utm_source=qr",
    image: "/littleHamperHouse.jpeg",
    isInstagram: true,
    gradient: "from-pink-500 via-rose-500 to-purple-500",
  },
];

export default function PartnerScroll() {
  return (
    <div className="w-full py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Our Partners
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mx-auto shadow-lg shadow-purple-300/50"></div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg font-medium">
            Proud to collaborate with these amazing brands
          </p>
        </div>

        {/* Partners Grid - Responsive and Centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-12 md:gap-14 lg:gap-16 py-4 md:py-8 lg:py-12 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px]"
            >
              {/* Content Container */}
              <div className="relative flex flex-col items-center text-center space-y-4 sm:space-y-5">
                {/* Partner Image - Medium Size */}
                <div className="relative w-52 h-52 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-400/20 bg-white border-2 border-gray-100">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-4 sm:p-5"
                    sizes="(max-width: 640px) 208px, (max-width: 768px) 224px, 256px"
                    priority
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                  ></div>
                </div>

                {/* Partner Name */}
                <h3
                  className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-br ${partner.gradient} bg-clip-text text-transparent leading-tight px-1`}
                >
                  {partner.name}
                </h3>

                {/* Partner Type Badge */}
                <div
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r ${partner.gradient} rounded-full shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}
                >
                  <p className="text-sm sm:text-base font-bold text-white">
                    {partner.type}
                  </p>
                </div>

                {/* Link Button */}
                <div className="flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-300 group-hover:shadow-md border border-gray-200 group-hover:border-gray-300">
                  {partner.isInstagram ? (
                    <>
                      <svg
                        className="w-5 h-5 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">
                        Visit Instagram
                      </span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="text-sm sm:text-base font-semibold text-gray-700">
                        Visit Website
                      </span>
                    </>
                  )}
                  <svg
                    className="w-3 h-3 text-gray-500 group-hover:translate-x-1 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Thank You Message */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border border-purple-200/50 shadow-lg max-w-2xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-semibold">
              🎉 Thank you to our amazing partners!
            </p>
            <p className="text-xs sm:text-sm text-gray-600 px-2">
              Making SAHITYAM 2026 unforgettable with their support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
