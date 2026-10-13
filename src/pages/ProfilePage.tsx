import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCircle, ShieldCheck, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, loginAs } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
            />
            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-brand-50 text-brand-700 border border-brand-200">
                {currentUser.role}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{currentUser.name}</h1>
              <p className="text-xs text-slate-500">{currentUser.title || 'Healthcare Professional'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400">Email Address:</span>
              <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>{currentUser.email}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-400">Contact Number:</span>
              <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{currentUser.phone || '+33 1 42 68 55 00'}</span>
              </div>
            </div>
          </div>

          {/* Quick role switcher inside profile */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Quickly Switch Demo User Persona
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                onClick={() => loginAs('patient')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  currentUser.role === 'patient'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => loginAs('doctor')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  currentUser.role === 'doctor'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Doctor
              </button>
              <button
                onClick={() => loginAs('receptionist')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  currentUser.role === 'receptionist'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Receptionist
              </button>
              <button
                onClick={() => loginAs('admin')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  currentUser.role === 'admin'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Administrator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
