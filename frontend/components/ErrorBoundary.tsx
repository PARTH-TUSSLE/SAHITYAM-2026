"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // In production, you could send this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry, LogRocket, etc.
      // logErrorToService(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
          <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 sm:p-8 md:p-12 text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mb-6">
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-xs sm:text-sm text-yellow-400 hover:text-yellow-300 transition-colors mb-2">
                  View Error Details (Development Only)
                </summary>
                <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 overflow-auto max-h-60">
                  <pre className="text-[10px] sm:text-xs text-red-300 whitespace-pre-wrap break-words">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 text-sm sm:text-base"
              >
                Go to Home
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs sm:text-sm text-gray-400">
                If this problem persists, please{" "}
                <a
                  href="/contact"
                  className="text-purple-400 hover:text-purple-300 transition-colors underline"
                >
                  contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
