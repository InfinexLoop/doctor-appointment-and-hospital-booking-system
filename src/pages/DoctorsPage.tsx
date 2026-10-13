import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Search, Star, Calendar, Clock, MapPin, Globe, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { doctors, departments } = useApp();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('department') || 'all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;
      const matchesAvailability = !onlyAvailable || doc.isAvailableToday;

      return matchesSearch && matchesDept && matchesAvailability;
    });
  }, [doctors, searchQuery, selectedDept, onlyAvailable]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-2">
            Clinical Specialist Roster
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Your Consulting Physician
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Book appointments directly with board-certified physicians, review clinical qualifications, and see today's chamber availability.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-soft mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search physician by name, specialty, or condition..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>

            {/* Department Dropdown */}
            <div className="w-full md:w-64">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700"
              >
                <option value="all">All Hospital Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
              <input
                type="checkbox"
                id="availOnly"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <label htmlFor="availOnly" className="text-xs font-semibold text-slate-700 cursor-pointer">
                On-Duty Today Only
              </label>
            </div>
          </div>

          {/* Department Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
                selectedDept === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({doctors.length})
            </button>
            {departments.map((dept) => {
              const count = doctors.filter((d) => d.departmentId === dept.id).length;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
                    selectedDept === dept.id
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctor Results Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{doc.rating}</span>
                          <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                        </div>
                        {doc.isAvailableToday ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> On Duty
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Off Duty
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-base mt-1 truncate">{doc.name}</h3>
                      <p className="text-xs font-semibold text-brand-600">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.departmentName}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Chamber:
                      </span>
                      <span className="font-semibold text-slate-800">{doc.roomNumber}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        Languages:
                      </span>
                      <span className="text-slate-700 font-medium">{doc.languages.join(', ')}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Experience:
                      </span>
                      <span className="text-slate-800 font-semibold">{doc.experienceYears} Years</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400">Consultation Fee</span>
                      <span className="text-base font-extrabold text-slate-900">€{doc.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    to={`/doctor/${doc.id}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold text-center transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/book-appointment?doctor=${doc.id}`}
                    className="py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <XCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No doctors match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search keywords, clear the department filter, or show doctors who are off-duty today.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('all');
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
