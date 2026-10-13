import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDING } from '../../config/branding';
import { HeartPulse, Shield, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">MediLoop Care</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation hospital appointment scheduling and real-time waiting queue management system engineered for high-volume clinics and health centers.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-brand-400 border border-slate-700">
                <Shield className="w-3.5 h-3.5" /> Client Demonstration Platform
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home & Overview</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">Doctor Directory</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">Hospital Departments</Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-white transition-colors">Book an Appointment</Link>
              </li>
              <li>
                <Link to="/token-history" className="hover:text-white transition-colors">Live Queue Tracker</Link>
              </li>
              <li>
                <Link to="/tv" className="hover:text-white transition-colors">Waiting Room TV Display</Link>
              </li>
            </ul>
          </div>

          {/* Demonstration Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Role Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/patient/dashboard" className="hover:text-white transition-colors">Patient Portal & Prescriptions</Link>
              </li>
              <li>
                <Link to="/doctor/dashboard" className="hover:text-white transition-colors">Doctor Chamber & Consultation Desk</Link>
              </li>
              <li>
                <Link to="/receptionist/dashboard" className="hover:text-white transition-colors">Reception & Walk-in Token Desk</Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin Analytics & Roster</Link>
              </li>
              <li>
                <Link to="/admin/queue" className="hover:text-white transition-colors">Queue Board Management</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Role Switcher Hub</Link>
              </li>
            </ul>
          </div>

          {/* Hospital Contacts & Attribution */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Hospital Hub</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>{BRANDING.hospitalAddress}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{BRANDING.emergencyPhone} (24/7 Hotline)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-brand-400 shrink-0" />
              <span>{BRANDING.supportEmail}</span>
            </div>
            <div className="pt-3">
              <a
                href={BRANDING.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Visit {BRANDING.companyName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with mandatory attribution */}
      <div className="bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-850 text-center sm:flex sm:justify-between sm:items-center text-xs text-slate-500">
        <p>
          Developed by{' '}
          <a
            href={BRANDING.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-brand-400 font-semibold underline underline-offset-2 transition-colors"
          >
            {BRANDING.companyName}
          </a>
          . All rights reserved.
        </p>
        <p className="mt-2 sm:mt-0 text-[11px] text-slate-400">
          Infinex Loop SaaS Client Demonstration • Synthetic Data Only • English Version
        </p>
      </div>
    </footer>
  );
};
