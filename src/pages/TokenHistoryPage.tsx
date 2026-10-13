import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QueueToken } from '../types';
import {
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Tv,
  MapPin,
  Stethoscope,
  Users,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Bell
} from 'lucide-react';

export const TokenHistoryPage: React.FC = () => {
  const { queueTokens } = useApp();

  const [lookupQuery, setLookupQuery] = useState('GEN-104');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  // Find targeted token
  const matchedToken = queueTokens.find(
    (t) =>
      t.tokenNumber.toLowerCase() === lookupQuery.trim().toLowerCase() ||
      (t.patientPhone && t.patientPhone.includes(lookupQuery.trim()))
  ) || queueTokens[0];

  // Calculate patients ahead for matched token
  const patientsAhead = matchedToken
    ? queueTokens.filter(
        (t) =>
          t.doctorId === matchedToken.doctorId &&
          t.status === 'waiting' &&
          queueTokens.indexOf(t) < queueTokens.indexOf(matchedToken)
      ).length
    : 0;

  // Filtered queue table
  const filteredTokens = queueTokens.filter(
    (t) => selectedDeptFilter === 'all' || t.departmentId === selectedDeptFilter
  );

  const getStatusBadge = (status: QueueToken['status']) => {
    switch (status) {
      case 'serving':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            NOW SERVING
          </span>
        );
      case 'waiting':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Waiting in Queue
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Completed
          </span>
        );
      case 'skipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Skipped
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              Real-Time Queue Tracking Engine
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Live Queue Status & Token Monitor
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Check your real-time waiting position, estimated countdown, and chamber room alerts.
            </p>
          </div>

          <Link
            to="/tv"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
          >
            <Tv className="w-4 h-4 text-emerald-400" />
            <span>Open Waiting Room TV View</span>
          </Link>
        </div>

        {/* LOOKUP SEARCH BAR */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Enter Token Number (e.g. GEN-104) or Phone Number..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-slate-50/50"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto">
              <span>Quick Demos:</span>
              <button
                type="button"
                onClick={() => setLookupQuery('GEN-104')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-semibold transition-colors"
              >
                GEN-104
              </button>
              <button
                type="button"
                onClick={() => setLookupQuery('CARD-201')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-semibold transition-colors"
              >
                CARD-201
              </button>
              <button
                type="button"
                onClick={() => setLookupQuery('PED-301')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-semibold transition-colors"
              >
                PED-301
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE TOKEN HIGHLIGHT CARD */}
        {matchedToken && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">
                    Active Patient Tracking
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                      {matchedToken.tokenNumber}
                    </h2>
                    {getStatusBadge(matchedToken.status)}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Chamber / Room</span>
                    <div className="text-lg font-bold text-white">{matchedToken.roomNumber}</div>
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="my-8">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-200">1. Token Issued</span>
                    <p className="text-[10px] text-slate-400">{matchedToken.issueTime}</p>
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${
                        matchedToken.status === 'serving' || matchedToken.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-slate-900 font-bold animate-bounce'
                      }`}
                    >
                      {matchedToken.status === 'serving' || matchedToken.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>2</span>
                      )}
                    </div>
                    <span className="font-bold text-slate-200">2. Waiting Room</span>
                    <p className="text-[10px] text-slate-400">
                      {matchedToken.status === 'serving'
                        ? 'Called'
                        : patientsAhead === 0
                        ? 'Next in line!'
                        : `${patientsAhead} patients ahead`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${
                        matchedToken.status === 'serving'
                          ? 'bg-emerald-400 text-slate-950 font-black animate-pulse'
                          : matchedToken.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {matchedToken.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span>3</span>
                      )}
                    </div>
                    <span className="font-bold text-slate-200">3. In Consultation</span>
                    <p className="text-[10px] text-slate-400">
                      {matchedToken.status === 'serving'
                        ? 'Currently In Room'
                        : matchedToken.status === 'completed'
                        ? 'Finished'
                        : 'Awaiting call'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Bottom Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400">Patient:</span>
                  <div className="font-bold text-white text-sm">{matchedToken.patientName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Consulting Physician:</span>
                  <div className="font-bold text-white text-sm">{matchedToken.doctorName}</div>
                  <div className="text-[11px] text-teal-400">{matchedToken.departmentName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Wait:</span>
                  <div className="font-bold text-emerald-400 text-sm">
                    {matchedToken.status === 'serving'
                      ? 'Inside with Doctor'
                      : matchedToken.status === 'completed'
                      ? 'Completed'
                      : `~${matchedToken.estimatedWaitMins} Minutes`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FULL CLINIC QUEUE ROSTER */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Hospital-Wide Live Waiting Room</h3>
              <p className="text-xs text-slate-500 mt-0.5">Real-time status across all consultation suites</p>
            </div>

            {/* Department Filter */}
            <div className="w-full sm:w-64">
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-700 focus:outline-none"
              >
                <option value="all">All Hospital Departments</option>
                <option value="dept_gen">General Medicine</option>
                <option value="dept_cardio">Cardiology</option>
                <option value="dept_ped">Pediatrics</option>
                <option value="dept_derma">Dermatology</option>
                <option value="dept_ortho">Orthopedics</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Token #</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Department & Doctor</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Issued At</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTokens.map((token) => (
                  <tr key={token.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      {token.tokenNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {token.patientName}
                      {token.isWalkIn && (
                        <span className="ml-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          Walk-In
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="font-semibold text-slate-800">{token.doctorName}</div>
                      <div className="text-[11px] text-slate-400">{token.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {token.roomNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {token.issueTime}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(token.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setLookupQuery(token.tokenNumber);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="text-brand-600 hover:text-brand-800 font-bold text-xs"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
