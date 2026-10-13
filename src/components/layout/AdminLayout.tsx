import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BRANDING } from '../../config/branding';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Clock,
  Tv,
  Pill,
  CreditCard,
  Settings,
  RotateCcw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  UserCircle,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, actions }) => {
  const { currentUser, resetDemoData, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: 'DASHBOARDS',
      items: [
        { label: 'Admin Analytics', path: '/admin/dashboard', icon: LayoutDashboard, role: ['admin'] },
        { label: 'Doctor Desk', path: '/doctor/dashboard', icon: Stethoscope, role: ['doctor', 'admin'] },
        { label: 'Receptionist Desk', path: '/receptionist/dashboard', icon: ClipboardList, role: ['receptionist', 'admin'] },
        { label: 'Patient Portal', path: '/patient/dashboard', icon: UserCircle, role: ['patient', 'admin'] },
      ]
    },
    {
      title: 'HOSPITAL OPERATIONS',
      items: [
        { label: 'Appointments List', path: '/admin/appointments', icon: Calendar },
        { label: 'Live Queue & Monitor', path: '/admin/queue', icon: Clock },
        { label: 'Doctors Roster', path: '/admin/doctors', icon: Users },
        { label: 'Hospital Departments', path: '/admin/departments', icon: Building2 },
        { label: 'Pharmacy / Medicines', path: '/admin/medicines', icon: Pill },
        { label: 'Billing & Invoices', path: '/admin/payments', icon: CreditCard },
      ]
    },
    {
      title: 'SYSTEM & TOOLS',
      items: [
        { label: 'Waiting Room TV View', path: '/tv', icon: Tv },
        { label: 'Hospital Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  const handleReset = () => {
    if (window.confirm('Reset all demo appointments and queue tokens to initial state?')) {
      resetDemoData();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrator
          </span>
        );
      case 'doctor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
            <Stethoscope className="w-3.5 h-3.5" /> Doctor ({currentUser.name.split(' ')[1] || 'Physician'})
          </span>
        );
      case 'receptionist':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
            <ClipboardList className="w-3.5 h-3.5" /> Front Desk
          </span>
        );
      case 'patient':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <UserCircle className="w-3.5 h-3.5" /> Patient
          </span>
        );
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {/* Brand header */}
      <div className="p-5 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6v12M6 12h12" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">MediLoop Care</div>
            <div className="text-[10px] text-slate-400 leading-none">by {BRANDING.companyName}</div>
          </div>
        </Link>
      </div>

      {/* User profile widget */}
      <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-lg object-cover border border-slate-600"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{currentUser.name}</h4>
            <div className="mt-1">{getRoleBadge()}</div>
          </div>
        </div>
        <button
          onClick={() => setIsRoleModalOpen(true)}
          className="mt-3 w-full py-1.5 px-2 text-[11px] font-semibold text-brand-300 bg-slate-700/60 hover:bg-slate-700 hover:text-white rounded-lg transition-colors border border-slate-600/50 flex items-center justify-center gap-1.5"
        >
          <span>Switch Demo Role</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Navigation links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-5">
        {menuItems.map((group) => (
          <div key={group.title}>
            <h5 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {group.title}
            </h5>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={handleReset}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Exit to Public Portal</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 fixed inset-y-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="relative w-64 max-w-xs flex flex-col z-10">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">MediLoop Care</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">{title}</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight mt-0.5">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {actions}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <span className="hidden sm:inline">Role:</span>
              <span className="text-brand-600 capitalize">{currentUser.role}</span>
            </button>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600 px-2 py-1"
            >
              View Public Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </div>
  );
};
