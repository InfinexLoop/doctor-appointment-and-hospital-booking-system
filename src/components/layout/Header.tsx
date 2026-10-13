import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BRANDING } from '../../config/branding';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import {
  Calendar,
  Users,
  Building2,
  Clock,
  Tv,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  ClipboardList,
  UserCircle
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser } = useApp();
  const location = useLocation();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Determine dashboard destination based on role
  const getDashboardRoute = () => {
    switch (currentUser.role) {
      case 'doctor':
        return '/doctor/dashboard';
      case 'receptionist':
        return '/receptionist/dashboard';
      case 'admin':
        return '/admin/dashboard';
      case 'patient':
      default:
        return '/patient/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Doctors', path: '/doctors', icon: Users },
    { name: 'Departments', path: '/departments', icon: Building2 },
    { name: 'Book Appointment', path: '/book-appointment', icon: Calendar, highlight: true },
    { name: 'My Appointments', path: '/my-appointments', icon: Clock },
    { name: 'Live Queue', path: '/token-history', icon: Clock },
    { name: 'TV Display', path: '/tv', icon: Tv },
  ];

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700">
            <ShieldCheck className="w-3 h-3" /> Admin
          </span>
        );
      case 'doctor':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-700">
            <Stethoscope className="w-3 h-3" /> Doctor
          </span>
        );
      case 'receptionist':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700">
            <ClipboardList className="w-3 h-3" /> Receptionist
          </span>
        );
      case 'patient':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-700">
            <UserCircle className="w-3 h-3" /> Patient
          </span>
        );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 shadow-xs">
        {/* Top Demo Bar */}
        <div className="bg-slate-900 text-white text-[11px] py-1 px-4 text-center flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              Interactive Demo for Prospective Clients •{' '}
              <a
                href={BRANDING.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-300 font-semibold underline underline-offset-2 transition-colors"
              >
                {BRANDING.companyName}
              </a>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-slate-400">
            <span>24/7 Hotline: {BRANDING.emergencyPhone}</span>
            <span>•</span>
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="text-brand-300 hover:text-white font-medium hover:underline transition-colors"
            >
              Switch Demo Role
            </button>
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                  <div className="relative">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 6v12M6 12h12" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-teal-400 rounded-full border-2 border-brand-700"></span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-slate-900 tracking-tight">MediLoop</span>
                    <span className="text-xs font-bold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">CARE</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-none">
                    by <span className="font-semibold text-slate-700">Infinex Loop</span>
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                if (item.highlight) {
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="ml-1 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/20 transition-all hover:shadow"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.name}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-brand-600 bg-brand-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Role Switcher & Dashboard Shortcut */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to={getDashboardRoute()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                title="Go to Role Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                <span>Dashboard</span>
              </Link>

              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="inline-flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
                title="Switch Demonstration User Role"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none">Role</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {getRoleBadge()}
                  </div>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="p-1 rounded-lg border border-slate-200"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-md object-cover"
                />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
            <div className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="mt-0.5">{getRoleBadge()}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsRoleModalOpen(true);
                }}
                className="text-xs text-brand-600 font-semibold hover:underline"
              >
                Change Role
              </button>
            </div>

            <Link
              to={getDashboardRoute()}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-700 bg-brand-50"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-600" />
              Role Dashboard ({currentUser.role.toUpperCase()})
            </Link>

            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-brand-600 bg-brand-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 text-slate-400" />}
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
};
