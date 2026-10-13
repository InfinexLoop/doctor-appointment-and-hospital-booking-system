import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { QueueToken } from '../../types';
import {
  Clock,
  Tv,
  Bell,
  CheckCircle2,
  SkipForward,
  Building2,
  Stethoscope,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

export const AdminQueuePage: React.FC = () => {
  const {
    queueTokens,
    doctors,
    callNextPatient,
    completeConsultation,
    skipToken
  } = useApp();

  const [filterDept, setFilterDept] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = queueTokens.filter((t) => {
    const matchesDept = filterDept === 'all' || t.departmentId === filterDept;
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesDept && matchesStatus;
  });

  const servingTokens = queueTokens.filter((t) => t.status === 'serving');
  const waitingTokens = queueTokens.filter((t) => t.status === 'waiting');

  const getStatusBadge = (status: QueueToken['status']) => {
    switch (status) {
      case 'serving':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">Serving Now</span>;
      case 'waiting':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Waiting</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">Completed</span>;
      case 'skipped':
        return <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">Skipped</span>;
    }
  };

  return (
    <AdminLayout
      title="Master Queue & Waiting Room Board"
      subtitle="Supervise real-time patient queue flow, active chamber occupancy, and lounge TV displays"
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/tv"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Tv className="w-4 h-4 text-emerald-400" />
            <span>Launch Waiting Room TV</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Chambers Live Occupancy Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Doctor Chambers Live Status
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {servingTokens.length} active sessions in progress
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors
              .filter((d) => d.isAvailableToday)
              .slice(0, 4)
              .map((doc) => {
                const activeInChamber = queueTokens.find(
                  (t) => t.doctorId === doc.id && t.status === 'serving'
                );
                const nextWaiting = queueTokens.find(
                  (t) => t.doctorId === doc.id && t.status === 'waiting'
                );

                return (
                  <div
                    key={doc.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      activeInChamber
                        ? 'bg-gradient-to-b from-white to-emerald-50/30 border-emerald-300 shadow-soft'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {doc.roomNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{doc.name}</h4>
                        <p className="text-[11px] text-brand-600">{doc.departmentName}</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-100">
                        <Stethoscope className="w-4 h-4 text-slate-600" />
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {activeInChamber ? (
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Patient</span>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-base font-extrabold text-emerald-700">
                              {activeInChamber.tokenNumber}
                            </span>
                            <span className="text-xs text-slate-700 truncate max-w-[120px] font-medium">
                              {activeInChamber.patientName}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5">
                            <button
                              onClick={() => completeConsultation(activeInChamber.id)}
                              className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                            >
                              Finish Session
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs text-slate-400 italic">Chamber Free</div>
                          {nextWaiting ? (
                            <button
                              onClick={() => callNextPatient(doc.id)}
                              className="mt-2 w-full py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                            >
                              <Bell className="w-3 h-3" />
                              <span>Call {nextWaiting.tokenNumber}</span>
                            </button>
                          ) : (
                            <div className="mt-2 text-[11px] text-slate-400">No waiting patients</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Master Queue Roster */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Master Queue Board</h3>
              <p className="text-xs text-slate-500">Live tokens across all clinical units</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
              >
                <option value="all">All Token States</option>
                <option value="waiting">Waiting in Queue</option>
                <option value="serving">Serving Now</option>
                <option value="completed">Completed</option>
                <option value="skipped">Skipped</option>
              </select>

              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
              >
                <option value="all">All Departments</option>
                <option value="dept_gen">General Medicine</option>
                <option value="dept_cardio">Cardiology</option>
                <option value="dept_ped">Pediatrics</option>
                <option value="dept_derma">Dermatology</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Token #</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor & Unit</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Wait Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Queue Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      {t.tokenNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{t.patientName}</div>
                      {t.isWalkIn && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1 py-0.5 rounded">
                          Walk-In
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{t.doctorName}</div>
                      <div className="text-[10px] text-slate-400">{t.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">{t.roomNumber}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {t.status === 'serving' ? (
                        <span className="font-bold text-emerald-600">Active</span>
                      ) : t.status === 'waiting' ? (
                        `~${t.estimatedWaitMins}m`
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(t.status)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {t.status === 'waiting' && (
                          <button
                            onClick={() => callNextPatient(t.doctorId)}
                            className="px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-[11px]"
                          >
                            Call Next
                          </button>
                        )}
                        {t.status === 'serving' && (
                          <button
                            onClick={() => completeConsultation(t.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px]"
                          >
                            Complete
                          </button>
                        )}
                        {t.status === 'waiting' && (
                          <button
                            onClick={() => skipToken(t.id)}
                            className="px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 font-semibold text-[11px]"
                          >
                            Skip
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
