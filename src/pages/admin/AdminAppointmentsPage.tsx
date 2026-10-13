import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Appointment, AppointmentStatus } from '../../types';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ChevronRight,
  X
} from 'lucide-react';

export const AdminAppointmentsPage: React.FC = () => {
  const { appointments, updateAppointmentStatus, cancelAppointment } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [activeModalAppointment, setActiveModalAppointment] = useState<Appointment | null>(null);

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || a.status === selectedStatus;
    const matchesDept = selectedDept === 'all' || a.departmentId === selectedDept;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Confirmed</span>;
      case 'in-progress':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse">In Session</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Cancelled</span>;
    }
  };

  return (
    <AdminLayout
      title="Hospital Appointments Registry"
      subtitle="Comprehensive schedule management across all clinical departments"
    >
      <div className="space-y-6">
        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, doctor, token #..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Session</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="all">All Departments</option>
              <option value="dept_gen">General Medicine</option>
              <option value="dept_cardio">Cardiology</option>
              <option value="dept_ped">Pediatrics</option>
              <option value="dept_derma">Dermatology</option>
              <option value="dept_ortho">Orthopedics</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ref & Token</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor & Unit</th>
                  <th className="py-3 px-4">Schedule</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-brand-700">{apt.tokenNumber}</div>
                      <div className="text-[10px] text-slate-400">{apt.referenceNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400">{apt.patientPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{apt.doctorName}</div>
                      <div className="text-[10px] text-slate-400">{apt.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-700">{apt.date}</div>
                      <div className="text-[10px] text-slate-500">{apt.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize text-slate-600 font-medium">{apt.type}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      €{apt.fee}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveModalAppointment(apt)}
                          className="px-2.5 py-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-[11px]"
                        >
                          Details
                        </button>
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold text-[11px]"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No appointment records match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {activeModalAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-600" />
                  <h3 className="text-base font-bold text-slate-900">Appointment Record</h3>
                </div>
                <button onClick={() => setActiveModalAppointment(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reference:</span>
                    <span className="font-bold text-slate-900">{activeModalAppointment.referenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Queue Token:</span>
                    <span className="font-extrabold text-brand-700">{activeModalAppointment.tokenNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span>{getStatusBadge(activeModalAppointment.status)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400">Patient Name:</span>
                    <div className="font-bold text-slate-800">{activeModalAppointment.patientName}</div>
                    <div className="text-slate-500">{activeModalAppointment.patientAge} yrs • {activeModalAppointment.patientGender}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Consultant:</span>
                    <div className="font-bold text-slate-800">{activeModalAppointment.doctorName}</div>
                    <div className="text-slate-500">{activeModalAppointment.departmentName}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400">Symptoms / Medical Complaint:</span>
                  <p className="mt-1 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    {activeModalAppointment.symptoms}
                  </p>
                </div>

                {activeModalAppointment.notes && (
                  <div>
                    <span className="text-slate-400">Physician Diagnosis:</span>
                    <p className="mt-1 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900">
                      {activeModalAppointment.notes}
                    </p>
                  </div>
                )}

                {activeModalAppointment.prescription && (
                  <div>
                    <span className="text-slate-400">Prescription:</span>
                    <p className="mt-1 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 font-mono">
                      {activeModalAppointment.prescription}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveModalAppointment(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
