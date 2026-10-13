import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UserCircle, Stethoscope, ClipboardList, ShieldCheck, RotateCcw, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, loginAs, users, resetDemoData } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const rolesConfig: {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    dashboardRoute: string;
  }[] = [
    {
      role: 'patient',
      title: 'Patient Portal',
      description: 'Book appointments, track live queue token in real-time, view medical prescriptions.',
      icon: <UserCircle className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      dashboardRoute: '/patient/dashboard'
    },
    {
      role: 'doctor',
      title: 'Doctor Chamber',
      description: 'Consultation room dashboard, call next waiting patient, record diagnosis & prescriptions.',
      icon: <Stethoscope className="w-6 h-6 text-teal-600" />,
      color: 'bg-teal-50 border-teal-200 hover:border-teal-400',
      dashboardRoute: '/doctor/dashboard'
    },
    {
      role: 'receptionist',
      title: 'Reception & Admissions',
      description: 'Front-desk operations, issue walk-in queue tokens, check-in booked patients, monitor queues.',
      icon: <ClipboardList className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
      dashboardRoute: '/receptionist/dashboard'
    },
    {
      role: 'admin',
      title: 'Hospital Administrator',
      description: 'Hospital analytics, doctor schedules, department rosters, queue TV board, billing & pharmacy.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
      dashboardRoute: '/admin/dashboard'
    }
  ];

  const handleSelectRole = (role: UserRole, targetRoute: string) => {
    loginAs(role);
    onClose();
    navigate(targetRoute);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo appointments and queue tokens to initial state?')) {
      resetDemoData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-1.5">
              Interactive Sales Demonstration
            </div>
            <h3 className="text-xl font-bold text-slate-900">Select Demo User Role</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instantly preview how different healthcare stakeholders interact with the system
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {rolesConfig.map((item) => {
            const isCurrent = currentUser.role === item.role;
            const userObj = users.find((u) => u.role === item.role);

            return (
              <div
                key={item.role}
                onClick={() => handleSelectRole(item.role, item.dashboardRoute)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${item.color} ${
                  isCurrent ? 'ring-2 ring-brand-600 border-transparent shadow-sm' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm shrink-0 border border-slate-100">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900 text-base">{item.title}</h4>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 bg-brand-100 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3" /> Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                      {userObj && (
                        <div className="mt-2 text-xs font-medium text-slate-500 flex items-center gap-2">
                          <span className="text-slate-700 font-semibold">{userObj.name}</span>
                          <span>•</span>
                          <span>{userObj.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
