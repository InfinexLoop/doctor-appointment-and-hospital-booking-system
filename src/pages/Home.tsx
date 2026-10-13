import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BRANDING } from '../config/branding';
import {
  Calendar,
  Clock,
  Search,
  ShieldCheck,
  Users,
  ChevronRight,
  ArrowRight,
  Star,
  Activity,
  HeartPulse,
  Tv,
  CheckCircle2,
  Stethoscope,
  Building2,
  Zap,
  MapPin
} from 'lucide-react';

export const Home: React.FC = () => {
  const { doctors, departments, queueTokens, loginAs } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  const currentlyServing = queueTokens.filter((q) => q.status === 'serving');
  const waitingTokens = queueTokens.filter((q) => q.status === 'waiting');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleRoleJump = (role: 'patient' | 'doctor' | 'receptionist' | 'admin', route: string) => {
    loginAs(role);
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 pt-12 pb-20 border-b border-slate-200/60">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-400/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-800 border border-brand-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                <span>{BRANDING.hospitalName} • Digital Healthcare Portal</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Smart Doctor Bookings & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600">
                  Real-Time Queue Tracking
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience seamless healthcare admissions. Schedule appointments with leading medical specialists, generate instant digital queue tokens, and track your consultation turn live from your mobile device or waiting room monitors.
              </p>

              {/* Quick Search Widget */}
              <form onSubmit={handleQuickSearch} className="bg-white p-2.5 rounded-2xl shadow-card border border-slate-200 flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-3 gap-2.5 text-slate-400">
                  <Search className="w-5 h-5 shrink-0 text-brand-600" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor, medical specialty, or symptom..."
                    className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Find Care</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              {/* Action Buttons & Hotline */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/book-appointment"
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </Link>
                <Link
                  to="/token-history"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 shadow-2xs transition-all flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>Track Live Queue</span>
                </Link>
                <Link
                  to="/tv"
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-sm transition-all flex items-center gap-1.5"
                >
                  <Tv className="w-4 h-4 text-slate-500" />
                  <span>Waiting Room TV</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Waiting Room Clutter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant SMS/Digital Token</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Board-Certified Specialists</span>
                </div>
              </div>
            </div>

            {/* Right Hero Live Queue Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h3 className="font-bold text-slate-900 text-base">Live Waiting Room Queue</h3>
                  </div>
                  <Link
                    to="/tv"
                    className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Full TV View</span>
                    <Tv className="w-3 h-3" />
                  </Link>
                </div>

                {/* Now Serving List */}
                <div className="mt-4 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Currently Inside Consultation Room
                  </div>
                  {currentlyServing.length > 0 ? (
                    currentlyServing.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-extrabold text-emerald-700 tracking-wider">
                              {item.tokenNumber}
                            </span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-800">
                              {item.roomNumber}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 mt-0.5">{item.patientName}</p>
                          <p className="text-[11px] text-slate-500">{item.doctorName} • {item.departmentName}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                            IN SESSION
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-50 border text-center text-xs text-slate-500">
                      No consultations actively in session.
                    </div>
                  )}
                </div>

                {/* Next in Line */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">Next In Waiting Area</span>
                    <span className="text-slate-500 font-medium">{waitingTokens.length} patients waiting</span>
                  </div>
                  <div className="space-y-2">
                    {waitingTokens.slice(0, 3).map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900">{item.tokenNumber}</span>
                            <span className="text-slate-500 ml-1.5">({item.patientName})</span>
                          </div>
                        </div>
                        <div className="text-right text-slate-500 font-medium">
                          <span>~{item.estimatedWaitMins}m wait</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action card banner */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Have an appointment code?</span>
                  <Link
                    to="/token-history"
                    className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>Check Your Token</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ROLE LAUNCHPAD (DEMO SHOWCASE BAR) */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                Interactive Persona Test Drive
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Explore The App Through Different Stakeholder Eyes
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Switch roles with a single click to see tailored dashboards for patients, doctors, receptionists, and hospital administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => handleRoleJump('patient', '/patient/dashboard')}
              className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-brand-500 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Patient Portal</h4>
                  <p className="text-[11px] text-slate-400">Book & track queue tokens</p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-brand-400 flex items-center gap-1 group-hover:text-brand-300">
                <span>Launch as Rajesh Kumar</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            <div
              onClick={() => handleRoleJump('doctor', '/doctor/dashboard')}
              className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-teal-500 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Doctor Chamber</h4>
                  <p className="text-[11px] text-slate-400">Call patients & write Rx</p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-teal-400 flex items-center gap-1 group-hover:text-teal-300">
                <span>Launch as Dr. Arun Sharma</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            <div
              onClick={() => handleRoleJump('receptionist', '/receptionist/dashboard')}
              className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-indigo-500 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Front Desk Desk</h4>
                  <p className="text-[11px] text-slate-400">Walk-in tokens & check-in</p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-indigo-400 flex items-center gap-1 group-hover:text-indigo-300">
                <span>Launch as Sarah Jenkins</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            <div
              onClick={() => handleRoleJump('admin', '/admin/dashboard')}
              className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-purple-500 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Admin Analytics</h4>
                  <p className="text-[11px] text-slate-400">Stats, roster, TV & billing</p>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-purple-400 flex items-center gap-1 group-hover:text-purple-300">
                <span>Launch as Dr. Laurent</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOSPITAL STATS METRICS */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-600">35,000+</div>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Patient Consultations</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600">12 Mins</div>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Average Wait Time</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">98.4%</div>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">On-Time Doctor Sessions</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-600">8 Units</div>
              <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Specialized Departments</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS SHOWCASE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Clinical Excellence</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Explore Hospital Departments
            </h2>
          </div>
          <Link
            to="/departments"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All 8 Departments</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.slice(0, 4).map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{dept.name}</h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                  <span>{dept.doctorCount} Doctors</span>
                  <span className="font-semibold text-teal-600">~{dept.averageWaitTimeMins}m wait</span>
                </div>
                <Link
                  to={`/doctors?department=${dept.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Consult Specialists</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Medical Staff</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Meet Our Leading Specialists
              </h2>
            </div>
            <Link
              to="/doctors"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Browse All Physicians</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doctor) => (
              <div
                key={doctor.id}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{doctor.rating}</span>
                        <span className="text-slate-400 font-normal">({doctor.reviewsCount})</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-1">{doctor.name}</h3>
                      <p className="text-xs font-medium text-brand-600">{doctor.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doctor.departmentName}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400">Consultation Fee</span>
                      <div className="font-bold text-slate-900">€{doctor.consultationFee}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Chamber</span>
                      <div className="font-bold text-slate-800">{doctor.roomNumber}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    to={`/doctor/${doctor.id}`}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold text-center transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    to={`/book-appointment?doctor=${doctor.id}`}
                    className="py-2.5 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center transition-colors shadow-sm"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THE SYSTEM WORKS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Intuitive Workflow</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            How MediLoop Optimizes Care
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            A seamless patient journey from online booking to digital queue tracking and post-consultation care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Select Doctor</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Browse verified specialists by clinical department, verified ratings, and consultation fee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Pick Date & Time</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose an available consultation slot or opt for tele-health virtual consultation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Instant Queue Token</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Get an automated digital token (e.g. GEN-104) and estimated wait time countdown.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 font-extrabold text-lg flex items-center justify-center mx-auto mb-4">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">Live Queue Updates</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track your exact queue position from your phone or clinic monitors with chime alerts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-brand-700 via-brand-600 to-teal-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Experience Modern Healthcare Management?
          </h2>
          <p className="text-sm sm:text-base text-brand-100 max-w-2xl mx-auto">
            Book a test appointment right now to see the live queue updates and automated doctor chamber workflow in real-time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-appointment"
              className="px-6 py-3 rounded-xl bg-white text-brand-700 hover:bg-brand-50 font-bold text-sm shadow-lg transition-all"
            >
              Book Test Appointment
            </Link>
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 rounded-xl bg-brand-800/80 hover:bg-brand-800 text-white border border-brand-400/30 font-semibold text-sm transition-all"
            >
              Explore Admin Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
