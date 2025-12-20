import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "@/components/ErrorBoundary";
import BackgroundMusicPlayer from "@/components/BackgroundMusicPlayer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SAHITYAM 2026 - Where Art and Literature Converge",
  description:
    "Join us for SAHITYAM 2026, a premier literature festival celebrating the confluence of art and literature. Experience workshops, performances, and engaging discussions on February 3, 2026.",
  keywords: [
    "SAHITYAM",
    "literature festival",
    "art",
    "literature",
    "2026",
    "cultural event",
    "workshops",
    "performances",
  ],
  authors: [{ name: "SAHITYAM Team" }],
  openGraph: {
    title: "SAHITYAM 2026 - Where Art and Literature Converge",
    description:
      "Join us for SAHITYAM 2026, a premier literature festival celebrating the confluence of art and literature.",
    type: "website",
    locale: "en_US",
    siteName: "SAHITYAM 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAHITYAM 2026 - Where Art and Literature Converge",
    description: "Join us for SAHITYAM 2026, a premier literature festival.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2D75SV5JMJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2D75SV5JMJ');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} antialiased font-sans overflow-x-hidden`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#1f2937",
              padding: "16px",
              borderRadius: "12px",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
              style: {
                border: "2px solid #10b981",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
              style: {
                border: "2px solid #ef4444",
              },
            },
          }}
        />

        <ErrorBoundary>
          <AuthProvider>
            <BackgroundMusicPlayer />
            <div className="relative z-10">{children}</div>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
