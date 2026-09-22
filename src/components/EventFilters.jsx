import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDepartment,
  setCategory,
  setSearchQuery,
  resetFilters,
  selectDepartmentFilter,
  selectCategoryFilter,
  selectSearchQuery
} from '../redux/slices/eventSlice';
import { Search, RotateCcw, Filter, Sparkles } from 'lucide-react';

const DEPARTMENTS = ['ALL', 'CSE', 'AI&DS', 'ECE', 'MECH', 'CIVIL', 'IT'];
const CATEGORIES = ['ALL', 'Hackathon', 'Technical', 'Workshop', 'Non-Technical'];

export default function EventFilters({ onFilterChange }) {
  const dispatch = useDispatch();
  const selectedDept = useSelector(selectDepartmentFilter);
  const selectedCat = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);

  const handleDeptSelect = (dept) => {
    dispatch(setDepartment(dept));
    if (onFilterChange) onFilterChange();
  };

  const handleCatSelect = (cat) => {
    dispatch(setCategory(cat));
    if (onFilterChange) onFilterChange();
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if (onFilterChange) onFilterChange();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (onFilterChange) onFilterChange();
  };

  const isFiltered = selectedDept !== 'ALL' || selectedCat !== 'ALL' || searchQuery !== '';

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Top Row: Search Bar & Reset */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events by title or keyword (e.g. Hackathon, CAD, AI)..."
            className="w-full pl-10 pr-4 py-3 rounded-none bg-white/90 border-4 border-black focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/40 text-black placeholder-neutral-400 text-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-600 hover:text-black"
            >
              Clear
            </button>
          )}
        </div>

        {/* Reset Filters Button */}
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-4 py-3 rounded-none bg-white/80 hover:bg-neutral-100 text-neutral-700 hover:text-black border-4 border-black text-xs font-semibold transition touch-target w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Middle Row: Department Filter Pills (Mobile-Scrollable) */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider flex items-center space-x-1 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Dept:</span>
          </span>

          {DEPARTMENTS.map((dept) => {
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => handleDeptSelect(dept)}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold whitespace-nowrap transition-all touch-target ${
                  active
                    ? 'btn-fest-primary text-black shadow-glow-primary scale-105'
                    : 'bg-white/80 text-neutral-600 hover:text-neutral-800 hover:bg-white border-4 border-black'
                }`}
              >
                {dept === 'ALL' ? 'All Departments' : dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Category Filter Tabs */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider flex items-center space-x-1 mr-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Category:</span>
          </span>

          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCatSelect(cat)}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold whitespace-nowrap transition-all touch-target ${
                  active
                    ? 'bg-brut-yellow text-black border-4 border-black shadow-pop-sm scale-105'
                    : 'bg-white/80 text-neutral-600 hover:text-neutral-800 hover:bg-white border-4 border-black'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
