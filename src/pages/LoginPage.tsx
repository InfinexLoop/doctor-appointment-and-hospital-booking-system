import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { BRANDING } from '../config/branding';
import {
  UserCircle,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  ChevronRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAs, users } = useApp();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('demo123');

  const demoRoles: {
    role: UserRole;
    name: string;
    email: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    badge: string;
    targetRoute: string;
  }[] = [
    {
      role: 'patient',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@infinexloop.com',
      title: 'Patient Demo User',
      icon: <UserCircle className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/50',
      badge: 'Patient Portal',
      targetRoute: '/patient/dashboard'
    },
    {
      role: 'doctor',
      name: 'Dr. Arun Sharma',
      email: 'arun.sharma@infinexloop.com',
      title: 'Senior Physician & Consultant',
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
      color: 'border-teal-200 hover:border-teal-400 bg-teal-50/50',
      badge: 'Doctor Chamber',
      targetRoute: '/doctor/dashboard'
    },
    {
      role: 'receptionist',
      name: 'Sarah Jenkins',
      email: 'receptionist@infinexloop.com',
      title: 'Admissions & Front Desk Manager',
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
      color: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/50',
      badge: 'Reception Desk',
      targetRoute: '/receptionist/dashboard'
    },
    {
      role: 'admin',
      name: 'Dr. Arthur Laurent',
      email: 'admin@infinexloop.com',
      title: 'Hospital Director & Admin',
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      color: 'border-purple-200 hover:border-purple-400 bg-purple-50/50',
      badge: 'Full Admin Rights',
      targetRoute: '/admin/dashboard'
    }
  ];

  const handleSelectRole = (role: UserRole, targetRoute: string) => {
    loginAs(role);
    navigate(targetRoute);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = users.find((u) => u.email.toLowerCase() === emailInput.toLowerCase().trim());
    if (matched) {
      loginAs(matched.role, matched);
      if (matched.role === 'admin') navigate('/admin/dashboard');
      else if (matched.role === 'doctor') navigate('/doctor/dashboard');
      else if (matched.role === 'receptionist') navigate('/receptionist/dashboard');
      else navigate('/patient/dashboard');
    } else {
      // Default to admin
      loginAs('admin');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">MediLoop Care</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Select Login Role
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          Choose a pre-configured persona below to immediately access that role's interactive workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-200 sm:rounded-3xl sm:px-10 space-y-6">
          {/* Quick 1-Click Persona Cards */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant 1-Click Role Access</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoRoles.map((item) => (
                <div
                  key={item.role}
                  onClick={() => handleSelectRole(item.role, item.targetRoute)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${item.color}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-100 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {item.badge}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5 truncate">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{item.email}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-brand-700">
                    <span>Log In As {item.role}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold">Or Sign In Manually</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@infinexloop.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Sign In to System</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer note */}
          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-brand-600 hover:underline font-semibold">
              ← Return to Public Hospital Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
