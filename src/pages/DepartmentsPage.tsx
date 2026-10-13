import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  HeartPulse,
  Baby,
  Sparkles,
  Brain,
  Bone,
  Eye,
  Activity,
  Stethoscope,
  ChevronRight,
  Clock,
  Users,
  Building2,
  AlertCircle
} from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const { departments, doctors } = useApp();
  const [selectedFloor, setSelectedFloor] = useState('all');

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'cardiology':
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'pediatrics':
        return <Baby className="w-6 h-6 text-amber-600" />;
      case 'dermatology':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'neurology':
        return <Brain className="w-6 h-6 text-indigo-600" />;
      case 'orthopedics':
        return <Bone className="w-6 h-6 text-blue-600" />;
      case 'ophthalmology':
        return <Eye className="w-6 h-6 text-teal-600" />;
      case 'ent':
        return <Activity className="w-6 h-6 text-emerald-600" />;
      case 'general-medicine':
      default:
        return <Stethoscope className="w-6 h-6 text-brand-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-2">
            Hospital Clinical Units
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Specialized Medical Departments
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Our multi-specialty facility features state-of-the-art medical equipment, dedicated consultation suites, and prioritized waiting queues for every health division.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const deptDoctors = doctors.filter((d) => d.departmentId === dept.id);

            return (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
                      {getIcon(dept.slug)}
                    </div>
                    {dept.emergencyAvailable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                        24/7 Emergency
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        By Appointment
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-4">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Head Physician:</span>
                      <span className="font-semibold text-slate-800">{dept.headDoctor}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Active Doctors:</span>
                      <span className="font-semibold text-brand-600">{deptDoctors.length} On Roster</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Average Wait Time:</span>
                      <span className="font-semibold text-teal-600">~{dept.averageWaitTimeMins} Minutes</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-500">Facility Location:</span>
                      <span className="font-medium text-slate-700">{dept.floor}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    to={`/doctors?department=${dept.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white border border-brand-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>View Doctors in {dept.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
