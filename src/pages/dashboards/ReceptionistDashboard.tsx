import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  ClipboardList,
  UserPlus,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Building2,
  Printer,
  Sparkles,
  Phone
} from 'lucide-react';

export const ReceptionistDashboard: React.FC = () => {
  const {
    doctors,
    departments,
    appointments,
    queueTokens,
    generateWalkInToken,
    updateAppointmentStatus
  } = useApp();

  // Walk-in form state
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInDoctorId, setWalkInDoctorId] = useState(doctors[0]?.id || '');
  const [issuedTokenInfo, setIssuedTokenInfo] = useState<string | null>(null);

  // Search in arrivals
  const [searchQuery, setSearchQuery] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(
    (a) =>
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (walkInName.trim() && walkInDoctorId) {
      const token = generateWalkInToken(walkInName, walkInPhone || '+33 6 00 00 00 00', walkInDoctorId);
      setIssuedTokenInfo(`Token #${token.tokenNumber} generated for ${token.patientName}! Assigned to ${token.doctorName} (${token.roomNumber}).`);
      setWalkInName('');
      setWalkInPhone('');
    }
  };

  const handleCheckInPatient = (aptId: string) => {
    updateAppointmentStatus(aptId, 'confirmed');
  };

  const totalWalkIns = queueTokens.filter((q) => q.isWalkIn).length;
  const waitingPatients = queueTokens.filter((q) => q.status === 'waiting').length;

  return (
    <AdminLayout
      title="Reception & Admissions Desk"
      subtitle="Front-desk patient check-in, walk-in token issuance, and clinic lounge monitoring"
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Total Registrations</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{appointments.length + totalWalkIns}</div>
            <p className="text-[11px] text-slate-400 mt-1">Booked + Walk-ins</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Waiting in Lounge</span>
            <div className="text-3xl font-extrabold text-amber-600 mt-1">{waitingPatients}</div>
            <p className="text-[11px] text-slate-400 mt-1">Across all clinic rooms</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">Walk-In Tokens Issued</span>
            <div className="text-3xl font-extrabold text-brand-600 mt-1">{totalWalkIns}</div>
            <p className="text-[11px] text-slate-400 mt-1">Direct admission patients</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Doctors On Duty</span>
            <div className="text-3xl font-extrabold text-teal-600 mt-1">
              {doctors.filter((d) => d.isAvailableToday).length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Actively consulting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* WALK-IN TOKEN GENERATOR FORM */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <UserPlus className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-bold text-slate-900">Issue Walk-In Queue Token</h3>
            </div>

            <p className="text-xs text-slate-500">
              Generate an immediate queue token for unbooked walk-in patients arriving at the clinic.
            </p>

            {issuedTokenInfo && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{issuedTokenInfo}</span>
                </div>
                <button onClick={() => setIssuedTokenInfo(null)} className="text-emerald-500 hover:text-emerald-700 font-bold">
                  ×
                </button>
              </div>
            )}

            <form onSubmit={handleCreateWalkIn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  placeholder="e.g. Marc Dubois"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone (for SMS Token Alerts)</label>
                <input
                  type="tel"
                  value={walkInPhone}
                  onChange={(e) => setWalkInPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Consulting Doctor *</label>
                <select
                  value={walkInDoctorId}
                  onChange={(e) => setWalkInDoctorId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-800"
                >
                  {doctors
                    .filter((d) => d.isAvailableToday)
                    .map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — {d.departmentName} ({d.roomNumber})
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Issue & Print Walk-in Token</span>
              </button>
            </form>
          </div>

          {/* TODAY'S APPOINTMENTS ARRIVAL CHECK-IN TABLE */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Appointment Check-Ins</h3>
                <p className="text-xs text-slate-500">Confirm booked patient arrivals at the admissions desk</p>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter arrivals..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-[450px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3">Token</th>
                    <th className="py-2.5 px-3">Patient</th>
                    <th className="py-2.5 px-3">Doctor</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3 text-right">Desk Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todayAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-extrabold text-brand-700">
                        {apt.tokenNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{apt.patientName}</div>
                        <div className="text-[10px] text-slate-400">{apt.referenceNumber}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-700 font-medium">{apt.doctorName}</div>
                        <div className="text-[10px] text-slate-400">{apt.departmentName}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-600">
                        {apt.timeSlot}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {apt.status === 'in-progress' ? (
                          <span className="text-[11px] font-bold text-emerald-600">In Room</span>
                        ) : apt.status === 'completed' ? (
                          <span className="text-[11px] text-slate-400">Completed</span>
                        ) : (
                          <button
                            onClick={() => handleCheckInPatient(apt.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                          >
                            Check-In
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
