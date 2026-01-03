import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ trips, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ city: '', date: '', status: '' });
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilter({ searchTerm, ...filters });
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm, filters]);

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const filteredCount = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  ).length;

  return (
    <div className="relative max-w-4xl mx-auto mb-12">
      {/* Main Search Container */}
      <div className={`relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-1 transition-all duration-500 border border-white/50 hover:border-blue-200/50 group ${
        isFocused ? 'ring-4 ring-blue-200/50 scale-105' : 'hover:scale-[1.02]'
      }`}>
        
        {/* Input Field */}
        <div className="flex items-center bg-gradient-to-r from-white via-blue-50/50 to-indigo-50 rounded-2xl px-5 py-4">
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search trips by name, city or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex-1 bg-transparent outline-none text-lg font-medium text-gray-800 placeholder-gray-500 ml-3 w-full"
          />
          
          {searchTerm && (
            <button onClick={clearSearch} className="p-1 -m-1 rounded-full hover:bg-gray-200 transition-colors">
              <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          )}
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-3 p-2 rounded-xl hover:bg-white/50 transition-all group/filter"
          >
            <FunnelIcon className="w-6 h-6 text-gray-500 group-hover/filter:text-blue-500" />
          </button>
        </div>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="text-center mt-3 text-sm text-gray-600 animate-fade-in">
          Found {filteredCount} {filteredCount === 1 ? 'trip' : 'trips'}
        </div>
      )}

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 border border-white/50 animate-slide-down z-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Cities</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="New York">New York</option>
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Date Range
              </label>
              <select
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Any Date</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">All Status</option>
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowFilters(false)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Apply Filters ({Object.values(filters).filter(Boolean).length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
