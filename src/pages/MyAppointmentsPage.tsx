import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';
import {
  Calendar,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  FileText,
  Building,
  Video,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';

export const MyAppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment, rescheduleAppointment, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reschedule Modal State
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('11:00 AM');

  // Cancel Confirmation Modal State
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Prescription View Modal
  const [viewDetailsTarget, setViewDetailsTarget] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesTab = activeTab === 'all' || apt.status === activeTab;
    const matchesSearch =
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOpenReschedule = (apt: Appointment) => {
    setRescheduleTarget(apt);
    setNewDate(apt.date);
    setNewSlot(apt.timeSlot);
  };

  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleTarget && newDate && newSlot) {
      rescheduleAppointment(rescheduleTarget.id, newDate, newSlot);
      setRescheduleTarget(null);
    }
  };

  const handleConfirmCancel = () => {
    if (cancelTarget) {
      cancelAppointment(cancelTarget.id, cancelReason);
      setCancelTarget(null);
      setCancelReason('');
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse">
            <Clock className="w-3 h-3" /> In Session
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> Cancelled
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
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-2">
              Patient Care Hub
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Appointments & Bookings
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage your clinical schedule, reschedule sessions, and view doctor prescriptions.
            </p>
          </div>

          <Link
            to="/book-appointment"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book New Appointment</span>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="w-full sm:w-80 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctor, reference, department..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
              {(['all', 'confirmed', 'in-progress', 'completed', 'cancelled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold capitalize shrink-0 transition-colors ${
                    activeTab === tab
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab === 'all' ? 'All Bookings' : tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-soft hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Doctor & Schedule info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-bold text-slate-400">Ref: {apt.referenceNumber}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        Token: {apt.tokenNumber}
                      </span>
                      {getStatusBadge(apt.status)}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{apt.doctorName}</h3>
                    <p className="text-xs font-semibold text-brand-600">{apt.departmentName}</p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        {apt.type === 'video' ? (
                          <>
                            <Video className="w-3.5 h-3.5 text-teal-600" />
                            <span>Telehealth Video Call</span>
                          </>
                        ) : (
                          <>
                            <Building className="w-3.5 h-3.5 text-brand-600" />
                            <span>In-Person Consultation</span>
                          </>
                        )}
                      </div>
                    </div>

                    {apt.symptoms && (
                      <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                        <span className="font-semibold text-slate-700">Reason / Symptoms:</span> {apt.symptoms}
                      </p>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* Live queue tracker shortcut */}
                    {(apt.status === 'confirmed' || apt.status === 'in-progress') && (
                      <Link
                        to="/token-history"
                        className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Track Live Queue</span>
                      </Link>
                    )}

                    {/* Prescription / Notes button if completed */}
                    {apt.status === 'completed' && apt.prescription && (
                      <button
                        onClick={() => setViewDetailsTarget(apt)}
                        className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span>View Prescription</span>
                      </button>
                    )}

                    {/* Reschedule Button */}
                    {(apt.status === 'confirmed') && (
                      <button
                        onClick={() => handleOpenReschedule(apt)}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        Reschedule
                      </button>
                    )}

                    {/* Cancel Button */}
                    {(apt.status === 'confirmed') && (
                      <button
                        onClick={() => setCancelTarget(apt)}
                        className="px-3.5 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900">No appointments found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You do not have any appointments matching the current filter.
            </p>
            <Link
              to="/book-appointment"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
            >
              <span>Book An Appointment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* RESCHEDULE MODAL */}
        {rescheduleTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Reschedule Appointment</h3>
                <button onClick={() => setRescheduleTarget(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Rescheduling with <span className="font-semibold text-slate-900">{rescheduleTarget.doctorName}</span> (Ref: {rescheduleTarget.referenceNumber})
              </p>

              <form onSubmit={handleSaveReschedule} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Time Slot</label>
                  <select
                    value={newSlot}
                    onChange={(e) => setNewSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:45 AM">09:45 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:15 AM">11:15 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleTarget(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
                  >
                    Confirm Reschedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CANCEL MODAL */}
        {cancelTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-bold text-slate-900">Cancel Appointment?</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to cancel your appointment with <span className="font-semibold text-slate-900">{cancelTarget.doctorName}</span> on {cancelTarget.date} at {cancelTarget.timeSlot}? This will release your token #{cancelTarget.tokenNumber}.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Cancellation (Optional)</label>
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule conflict, feeling better..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCancelTarget(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Keep Appointment
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
                >
                  Yes, Cancel Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRESCRIPTION DETAILS MODAL */}
        {viewDetailsTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg w-full border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h3 className="text-base font-bold text-slate-900">Digital Medical Summary & Rx</h3>
                </div>
                <button onClick={() => setViewDetailsTarget(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Doctor:</span>
                    <span className="font-bold text-slate-800">{viewDetailsTarget.doctorName}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Date of Consultation:</span>
                    <span className="font-semibold text-slate-800">{viewDetailsTarget.date}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Reference:</span>
                    <span className="font-semibold text-slate-800">{viewDetailsTarget.referenceNumber}</span>
                  </div>
                </div>

                {viewDetailsTarget.notes && (
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Doctor's Clinical Notes:</h5>
                    <p className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 leading-relaxed">
                      {viewDetailsTarget.notes}
                    </p>
                  </div>
                )}

                {viewDetailsTarget.prescription && (
                  <div>
                    <h5 className="font-bold text-slate-900 mb-1">Prescribed Medications:</h5>
                    <p className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-mono leading-relaxed">
                      {viewDetailsTarget.prescription}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setViewDetailsTarget(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
