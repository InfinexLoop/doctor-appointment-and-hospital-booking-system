import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  User,
  FileText,
  Building,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
  Stethoscope,
  Video
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { appointments, queueTokens, currentUser } = useApp();

  const userAppointments = appointments.filter(
    (a) => a.patientName.toLowerCase().includes('rajesh') || a.patientEmail === currentUser.email
  );

  const upcoming = userAppointments.find(
    (a) => a.status === 'confirmed' || a.status === 'in-progress'
  );

  const activeToken = queueTokens.find(
    (t) =>
      t.status === 'waiting' ||
      t.status === 'serving' &&
      (t.patientName.toLowerCase().includes('rajesh') || t.appointmentId === upcoming?.id)
  );

  const completedAppointments = userAppointments.filter((a) => a.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-200 uppercase tracking-widest">
                Patient Health Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Welcome, {currentUser.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-100 mt-1 max-w-xl">
                Track your active consultation tokens in real-time, view verified doctor prescriptions, and manage upcoming hospital visits.
              </p>
            </div>

            <Link
              to="/book-appointment"
              className="px-5 py-3 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start md:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Appointment</span>
            </Link>
          </div>
        </div>

        {/* ACTIVE QUEUE TOKEN BANNER */}
        {activeToken ? (
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-200">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Your Live Queue Token
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-wider">
                    {activeToken.tokenNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeToken.status === 'serving'
                    ? 'bg-emerald-600 text-white animate-pulse'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeToken.status === 'serving' ? 'CALLED: INSIDE ROOM' : 'WAITING IN QUEUE'}
                </span>
                <Link
                  to="/token-history"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
                >
                  Live Position
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
              <div>
                <span className="text-slate-400">Physician:</span>
                <div className="font-bold text-slate-800">{activeToken.doctorName}</div>
              </div>
              <div>
                <span className="text-slate-400">Department:</span>
                <div className="font-bold text-slate-800">{activeToken.departmentName}</div>
              </div>
              <div>
                <span className="text-slate-400">Chamber:</span>
                <div className="font-bold text-emerald-700">{activeToken.roomNumber}</div>
              </div>
              <div>
                <span className="text-slate-400">Estimated Wait:</span>
                <div className="font-bold text-slate-800">
                  {activeToken.status === 'serving' ? 'In Session' : `~${activeToken.estimatedWaitMins} Mins`}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/my-appointments"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Appointments</h4>
                <p className="text-xs text-slate-500">{userAppointments.length} Total records</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/token-history"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Live Queue Tracker</h4>
                <p className="text-xs text-slate-500">Real-time status</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/doctors"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Doctor Directory</h4>
                <p className="text-xs text-slate-500">8 Specialists available</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* UPCOMING APPOINTMENT & PRESCRIPTIONS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointment */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Next Upcoming Appointment</h3>
              <Link to="/my-appointments" className="text-xs text-brand-600 font-semibold hover:underline">
                View All
              </Link>
            </div>

            {upcoming ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    Token #{upcoming.tokenNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Ref: {upcoming.referenceNumber}</span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base">{upcoming.doctorName}</h4>
                  <p className="text-xs font-semibold text-brand-600">{upcoming.departmentName}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{upcoming.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{upcoming.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>In-Person</span>
                  </div>
                </div>

                {upcoming.symptoms && (
                  <p className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                    "{upcoming.symptoms}"
                  </p>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                No upcoming appointments scheduled.
              </div>
            )}
          </div>

          {/* Past Consultation Prescriptions */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Doctor Prescriptions & Notes</h3>
              <span className="text-xs text-slate-500">{completedAppointments.length} Completed</span>
            </div>

            <div className="space-y-3">
              {completedAppointments.map((apt) => (
                <div key={apt.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{apt.doctorName}</span>
                    <span className="text-slate-500">{apt.date}</span>
                  </div>
                  {apt.notes && (
                    <p className="text-xs text-slate-600 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
                      <span className="font-semibold text-amber-900">Diagnosis:</span> {apt.notes}
                    </p>
                  )}
                  {apt.prescription && (
                    <p className="text-xs text-emerald-800 font-mono bg-emerald-50/70 p-2 rounded-lg border border-emerald-200">
                      <span className="font-bold font-sans">Rx:</span> {apt.prescription}
                    </p>
                  )}
                </div>
              ))}

              {completedAppointments.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                  No completed medical records recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
