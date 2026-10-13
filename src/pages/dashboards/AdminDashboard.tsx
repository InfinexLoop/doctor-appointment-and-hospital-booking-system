import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import {
  Calendar,
  Clock,
  Users,
  Building2,
  Tv,
  Pill,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { stats, appointments, queueTokens, doctors, departments } = useApp();

  // Synthetic charts dataset for demo
  const weeklyInflowData = [
    { day: 'Mon', appointments: 38, walkIns: 12, completed: 48 },
    { day: 'Tue', appointments: 44, walkIns: 15, completed: 56 },
    { day: 'Wed', appointments: 40, walkIns: 18, completed: 54 },
    { day: 'Thu', appointments: 52, walkIns: 20, completed: 68 },
    { day: 'Fri', appointments: 48, walkIns: 16, completed: 62 },
    { day: 'Sat', appointments: 30, walkIns: 10, completed: 38 },
    { day: 'Sun', appointments: 18, walkIns: 8, completed: 24 }
  ];

  const departmentData = [
    { name: 'General Medicine', value: 35, color: '#2563eb' },
    { name: 'Cardiology', value: 22, color: '#0d9488' },
    { name: 'Pediatrics', value: 18, color: '#f59e0b' },
    { name: 'Dermatology', value: 12, color: '#a855f7' },
    { name: 'Orthopedics', value: 13, color: '#ef4444' }
  ];

  const peakHoursData = [
    { hour: '08:00', load: 8 },
    { hour: '09:00', load: 18 },
    { hour: '10:00', load: 26 },
    { hour: '11:00', load: 24 },
    { hour: '12:00', load: 14 },
    { hour: '14:00', load: 20 },
    { hour: '15:00', load: 22 },
    { hour: '16:00', load: 12 }
  ];

  return (
    <AdminLayout
      title="Hospital Operations & Analytics"
      subtitle="Executive administrative overview of hospital appointments, department queues, and clinician utilization"
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/tv"
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            <span>Launch TV Monitor</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Appointments</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{stats.totalAppointmentsToday}</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14% vs last week</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Queue Tokens</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">
              {stats.queueWaitingCount + stats.queueServingCount}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {stats.queueWaitingCount} waiting • {stats.queueServingCount} in session
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clinicians On-Duty</span>
              <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{stats.onDutyDoctors} / {doctors.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Across 8 clinical units</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Billing (Today)</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">€{stats.totalRevenueToday}</div>
            <p className="text-[11px] text-slate-400 mt-1">98.4% Patient satisfaction</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Patient Inflow Trends Area Chart */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Weekly Patient Consultation Volume</h3>
                <p className="text-xs text-slate-500">Scheduled appointments vs walk-ins</p>
              </div>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">
                Last 7 Days
              </span>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyInflowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorWalk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="appointments" name="Booked Appointments" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApt)" />
                  <Area type="monotone" dataKey="walkIns" name="Walk-in Tokens" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWalk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Breakdown Donut Chart */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Department Distribution</h3>
              <p className="text-xs text-slate-500">Patient case load by specialty</p>
            </div>

            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-900">100%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Volume</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              {departmentData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                    <span className="text-slate-700 font-medium">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Hours & Quick Operational Shortcuts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Peak Hours Congestion */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Hourly Clinic Traffic</h3>
                <p className="text-xs text-slate-500">Peak waiting lounge patient load</p>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Peak: 10:00 - 11:30 AM
              </span>
            </div>

            <div className="h-52 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="load" name="Patients In Clinic" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-soft space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Administrative Operations</h3>
              <p className="text-xs text-slate-500">Quick management workflows</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                to="/admin/appointments"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 transition-all group"
              >
                <Calendar className="w-5 h-5 text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-900">Appointments List</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Filter, cancel & reschedule</p>
              </Link>

              <Link
                to="/admin/queue"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all group"
              >
                <Clock className="w-5 h-5 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-900">Queue Management</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Manage lounge flow</p>
              </Link>

              <Link
                to="/admin/doctors"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition-all group"
              >
                <Users className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-900">Doctors Roster</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Duty schedules & fees</p>
              </Link>

              <Link
                to="/admin/payments"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all group"
              >
                <CreditCard className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-slate-900">Billing & Invoices</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Consultation payments</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
