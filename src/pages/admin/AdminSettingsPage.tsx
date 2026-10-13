import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { BRANDING } from '../../config/branding';
import {
  Settings,
  Building2,
  Clock,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { resetDemoData } = useApp();

  const handleReset = () => {
    if (window.confirm('Reset all demo appointments and queue tokens to initial state?')) {
      resetDemoData();
    }
  };

  return (
    <AdminLayout
      title="Hospital Configuration & Settings"
      subtitle="Hospital facility profiles, outpatient queue policies, and demonstration state management"
    >
      <div className="max-w-4xl space-y-8">
        {/* Hospital Facility Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900">Hospital Facility Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Hospital Name:</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{BRANDING.hospitalName}</div>
            </div>

            <div>
              <span className="text-slate-400">Accreditation:</span>
              <div className="font-semibold text-emerald-700 mt-0.5">Joint Commission International (JCI) Certified</div>
            </div>

            <div>
              <span className="text-slate-400">Address & Campus:</span>
              <div className="font-medium text-slate-800 mt-0.5">{BRANDING.hospitalAddress}</div>
            </div>

            <div>
              <span className="text-slate-400">24/7 Emergency Line:</span>
              <div className="font-bold text-slate-900 mt-0.5">{BRANDING.emergencyPhone}</div>
            </div>

            <div>
              <span className="text-slate-400">Consultation Hours:</span>
              <div className="font-medium text-slate-800 mt-0.5">Monday - Saturday: 08:30 AM – 07:00 PM</div>
            </div>

            <div>
              <span className="text-slate-400">Average Chamber Slot Duration:</span>
              <div className="font-medium text-slate-800 mt-0.5">15 Minutes per Outpatient Session</div>
            </div>
          </div>
        </div>

        {/* Developer Attribution Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <h3 className="text-base font-bold text-slate-900">Software Architecture & Attribution</h3>
            </div>
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              Demo 02 / 15
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            This interactive Doctor Appointment & Hospital Queue System is engineered by{' '}
            <a
              href={BRANDING.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 font-bold hover:underline"
            >
              {BRANDING.companyName}
            </a>{' '}
            to showcase enterprise healthcare software capabilities, real-time waiting room orchestration, and role-based clinician workflows.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800">{BRANDING.companyName} Official Website:</span>
              <div className="text-slate-500">{BRANDING.companyWebsite}</div>
            </div>
            <a
              href={BRANDING.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Demo Data Reset Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-soft space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-rose-100">
            <RotateCcw className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">Demonstration Data Maintenance</h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Reset all modified appointments, created walk-in tokens, doctor availability states, and pharmacy stock changes back to pristine initial state.
          </p>

          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-rose-600/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Factory State</span>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};
