import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Users,
  Clock,
  CheckCircle2,
  Bell,
  Stethoscope,
  FileText,
  Pill,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const {
    currentUser,
    doctors,
    queueTokens,
    callNextPatient,
    completeConsultation,
    updateDoctorAvailability
  } = useApp();

  // Find active doctor object (Dr. Arun Sharma or current user)
  const doctor =
    doctors.find((d) => d.id === currentUser.doctorId || d.id === 'doc_1') || doctors[0];

  // Tokens assigned to this doctor
  const doctorTokens = queueTokens.filter((t) => t.doctorId === doctor.id);
  const currentlyServing = doctorTokens.find((t) => t.status === 'serving');
  const waitingTokens = doctorTokens.filter((t) => t.status === 'waiting');
  const completedTokens = doctorTokens.filter((t) => t.status === 'completed');

  // Diagnosis & Rx form state
  const [diagnosisNotes, setDiagnosisNotes] = useState(
    'Patient presents with persistent cough and mild tension headache. Chest clear on auscultation.'
  );
  const [prescriptionText, setPrescriptionText] = useState(
    'Amoxicillin 500mg tid x 5 days; Paracetamol 500mg prn; Warm saline gargles.'
  );

  const handleCallNext = () => {
    callNextPatient(doctor.id);
  };

  const handleFinishConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentlyServing) {
      completeConsultation(currentlyServing.id, diagnosisNotes, prescriptionText);
      setDiagnosisNotes('');
      setPrescriptionText('');
    }
  };

  return (
    <AdminLayout
      title={`Doctor Chamber: ${doctor.name}`}
      subtitle={`Room ${doctor.roomNumber} • ${doctor.departmentName} Department`}
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateDoctorAvailability(doctor.id, !doctor.isAvailableToday)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              doctor.isAvailableToday
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {doctor.isAvailableToday ? '● On-Duty Today' : '○ Off-Duty'}
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Patients Today</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{doctorTokens.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Booked & Walk-in roster</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Waiting in Lounge</span>
            <div className="text-3xl font-extrabold text-amber-600 mt-1">{waitingTokens.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting chamber call</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Inside Consultation</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">
              {currentlyServing ? '1 Active' : '0 Free'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Chamber {doctor.roomNumber}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Completed Sessions</span>
            <div className="text-3xl font-extrabold text-teal-600 mt-1">{completedTokens.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Prescriptions issued</p>
          </div>
        </div>

        {/* PRIMARY CALL ACTION BAR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Queue Flow Control</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Advance Waiting Room Queue
            </h3>
            <p className="text-xs text-slate-500">
              Calling the next patient will flash their token on waiting room monitors and chime in the lounge.
            </p>
          </div>

          <button
            onClick={handleCallNext}
            disabled={waitingTokens.length === 0}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              waitingTokens.length > 0
                ? 'bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white shadow-brand-500/20 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span>Call Next Patient ({waitingTokens.length} in Line)</span>
          </button>
        </div>

        {/* ACTIVE CONSULTATION WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main workspace */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Active Patient Consultation Desk</h3>
              </div>
              {currentlyServing && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                  Token #{currentlyServing.tokenNumber}
                </span>
              )}
            </div>

            {currentlyServing ? (
              <form onSubmit={handleFinishConsultation} className="space-y-5">
                {/* Patient Summary Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-400">Patient Name:</span>
                      <div className="text-sm font-bold text-slate-900">{currentlyServing.patientName}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Called at:</span>
                      <div className="font-semibold text-slate-700">{currentlyServing.calledAt || 'Just now'}</div>
                    </div>
                  </div>
                  {currentlyServing.patientPhone && (
                    <div className="text-slate-500">
                      Contact: <span className="font-medium text-slate-800">{currentlyServing.patientPhone}</span>
                    </div>
                  )}
                </div>

                {/* Clinical Diagnosis Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <span>Clinical Findings & Diagnosis Notes</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={diagnosisNotes}
                    onChange={(e) => setDiagnosisNotes(e.target.value)}
                    placeholder="Enter observation notes, vitals, diagnosis..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Prescription */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-teal-600" />
                    <span>Prescribed Medications & Dosage Instructions</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={prescriptionText}
                    onChange={(e) => setPrescriptionText(e.target.value)}
                    placeholder="e.g. Paracetamol 500mg tid, Amoxicillin 500mg bid..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-teal-500 focus:outline-none bg-slate-50/50"
                  ></textarea>
                </div>

                {/* Complete Consultation Button */}
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Consultation & Issue Digital Rx</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-16 text-center text-slate-500 border border-dashed rounded-2xl">
                <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-700">Chamber is Currently Free</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Click the "Call Next Patient" button above to bring the next waiting patient into your consultation room.
                </p>
                {waitingTokens.length > 0 && (
                  <button
                    onClick={handleCallNext}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm"
                  >
                    Call Token #{waitingTokens[0].tokenNumber} Now
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Today's Queue list for this doctor */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-900">Today's Chamber Roster</h3>
              <span className="text-xs text-slate-500">{doctorTokens.length} patients</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[480px] pr-1">
              {doctorTokens.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    t.status === 'serving'
                      ? 'bg-emerald-50 border-emerald-300'
                      : t.status === 'completed'
                      ? 'bg-slate-50 border-slate-200 text-slate-500'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{t.tokenNumber}</span>
                      {t.status === 'serving' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                          In Room
                        </span>
                      )}
                      {t.status === 'waiting' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                          Waiting
                        </span>
                      )}
                      {t.status === 'completed' && (
                        <span className="text-[10px] text-slate-400">Done</span>
                      )}
                    </div>
                    <div className="text-slate-700 font-semibold mt-0.5">{t.patientName}</div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400">
                    {t.status === 'waiting' && <span>~{t.estimatedWaitMins}m wait</span>}
                    {t.status === 'completed' && <span>Finished at {t.completedAt}</span>}
                    {t.status === 'serving' && <span className="text-emerald-700 font-bold">Active</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
