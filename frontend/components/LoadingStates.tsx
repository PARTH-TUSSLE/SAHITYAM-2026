// Skeleton components for loading states

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>

      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      {/* Meta info skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </div>

      {/* Button skeleton */}
      <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );
}

export function EventsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg animate-pulse">
      <div className="space-y-6">
        {/* Form fields skeleton */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
          </div>
        ))}

        {/* Button skeleton */}
        <div className="h-12 bg-gray-200 rounded-xl w-full mt-6"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Table header skeleton */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100 animate-pulse"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg animate-pulse">
      <div className="flex items-center gap-6 mb-8">
        {/* Avatar skeleton */}
        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>

        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      {/* Info cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-xl">
            <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      {/* Details skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex justify-between items-center py-3 border-b border-gray-100"
          >
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}

export function ButtonSkeleton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <div
      className={`h-12 bg-gray-200 rounded-xl animate-pulse ${
        fullWidth ? "w-full" : "w-32"
      }`}
    ></div>
  );
}

// Spinner component for inline loading states
export function Spinner({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-200 border-t-purple-600 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
}
