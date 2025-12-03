"use client";

import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  registrationFee: number;
  maxParticipants?: number;
  _count?: { registrations: number };
  [key: string]: any;
}

interface UseEventFiltersReturn {
  filters: {
    search: string;
    category: string;
    feeRange: string;
    sortBy: string;
  };
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setFeeRange: (value: string) => void;
  setSortBy: (value: string) => void;
  clearFilters: () => void;
  filterEvents: (events: Event[]) => Event[];
}

export function useEventFilters(): UseEventFiltersReturn {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    feeRange: "all",
    sortBy: "date",
  });

  const setSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const setCategory = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  const setFeeRange = (value: string) => {
    setFilters((prev) => ({ ...prev, feeRange: value }));
  };

  const setSortBy = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      feeRange: "all",
      sortBy: "date",
    });
  };

  const filterEvents = (events: Event[]): Event[] => {
    let filtered = [...events];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (event) => event.category === filters.category
      );
    }

    // Fee range filter
    if (filters.feeRange !== "all") {
      filtered = filtered.filter((event) => {
        const fee = event.registrationFee;
        switch (filters.feeRange) {
          case "free":
            return fee === 0;
          case "under-100":
            return fee > 0 && fee < 100;
          case "100-500":
            return fee >= 100 && fee <= 500;
          case "above-500":
            return fee > 500;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "date":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "fee-low":
        filtered.sort((a, b) => a.registrationFee - b.registrationFee);
        break;
      case "fee-high":
        filtered.sort((a, b) => b.registrationFee - a.registrationFee);
        break;
      case "popular":
        filtered.sort((a, b) => {
          const aCount = a._count?.registrations || 0;
          const bCount = b._count?.registrations || 0;
          return bCount - aCount;
        });
        break;
      case "available":
        filtered.sort((a, b) => {
          const aAvailable = a.maxParticipants
            ? a.maxParticipants - (a._count?.registrations || 0)
            : 999;
          const bAvailable = b.maxParticipants
            ? b.maxParticipants - (b._count?.registrations || 0)
            : 999;
          return bAvailable - aAvailable;
        });
        break;
    }

    return filtered;
  };

  return {
    filters,
    setSearch,
    setCategory,
    setFeeRange,
    setSortBy,
    clearFilters,
    filterEvents,
  };
}

// EventFilters Component
interface EventFiltersProps {
  filters: {
    search: string;
    category: string;
    feeRange: string;
    sortBy: string;
  };
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFeeRangeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
  totalEvents: number;
  filteredCount: number;
}

export function EventFilters({
  filters,
  onSearchChange,
  onCategoryChange,
  onFeeRangeChange,
  onSortChange,
  onClearFilters,
  totalEvents,
  filteredCount,
}: EventFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Filter Events</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {filteredCount} of {totalEvents} events
          </p>
        </div>
        {(filters.search ||
          filters.category !== "all" ||
          filters.feeRange !== "all") && (
          <button
            onClick={onClearFilters}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
          >
            <option value="all">All Categories</option>
            <option value="LITERATURE">Literature</option>
            <option value="ART">Art</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="PERFORMANCE">Performance</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Fee Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fee Range
          </label>
          <select
            value={filters.feeRange}
            onChange={(e) => onFeeRangeChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="under-100">Under ₹100</option>
            <option value="100-500">₹100 - ₹500</option>
            <option value="above-500">Above ₹500</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
          >
            <option value="date">Date (Earliest First)</option>
            <option value="fee-low">Fee (Low to High)</option>
            <option value="fee-high">Fee (High to Low)</option>
            <option value="popular">Most Popular</option>
            <option value="available">Most Available</option>
          </select>
        </div>
      </div>
    </div>
  );
}
