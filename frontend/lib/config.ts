// Configuration file for deployment-specific values
// Update these URLs after deployment

export const config = {
  // Frontend URL - Update after Vercel/Netlify deployment
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",

  // Backend API URL - Already configured
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

  // Social sharing configuration
  social: {
    // Default hashtags for social media sharing
    hashtags: ["SAHITYAM2026", "LiteratureFestival", "IndianLiterature"],

    // Twitter handle (optional)
    twitterHandle: "", // e.g., '@SAHITYAM2026'

    // Facebook Page ID (optional)
    facebookPageId: "",
  },

  // Event configuration
  events: {
    // Base URL for event pages
    getEventUrl: (eventId: string | number) =>
      `${
        process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
      }/events?id=${eventId}`,

    // Event image fallback
    defaultEventImage: "/images/default-event.jpg",
  },

  // Feature flags
  features: {
    enableSharing: true,
    enableQRCodes: true,
    enableEmailNotifications: true,
  },
};

// Helper function to get full event URL for sharing
export function getEventShareUrl(eventId: string | number): string {
  return config.events.getEventUrl(eventId);
}

// Helper function to get event description for sharing (truncated)
export function getShareDescription(
  description: string,
  maxLength: number = 200
): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength).trim() + "...";
}
