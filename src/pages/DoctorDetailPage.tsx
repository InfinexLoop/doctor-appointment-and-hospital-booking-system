import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  Globe,
  GraduationCap,
  Award,
  ArrowLeft,
  CheckCircle2,
  Phone,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DoctorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors, departments } = useApp();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id) || doctors[0];
  const department = departments.find((dept) => dept.id === doctor.departmentId);

  const mockReviews = [
    {
      author: 'Sophie M.',
      rating: 5,
      date: '3 days ago',
      comment: 'Very empathetic and thorough consultation. Explained my medication clearly and answered all questions with patience.'
    },
    {
      author: 'Marc D.',
      rating: 5,
      date: '1 week ago',
      comment: 'Prompt appointment and the live queue tracking meant zero idle waiting in the clinic hallway. Highly recommended!'
    },
    {
      author: 'Amina K.',
      rating: 4.8,
      date: '2 weeks ago',
      comment: 'Exceptional diagnostic skill. The digital prescription was sent immediately and my follow-up was seamless.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Doctors Directory</span>
          </Link>
        </div>

        {/* Doctor Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border border-slate-200 shadow-md shrink-0"
            />
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
                    {doctor.departmentName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {doctor.name}
                  </h1>
                  <p className="text-sm font-semibold text-slate-600">{doctor.title}</p>
                </div>
                {doctor.isAvailableToday ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    On-Duty Today
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                    Consulting By Schedule
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewsCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{doctor.experienceYears} Years Clinical Experience</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{doctor.roomNumber}</span>
                </div>
              </div>

              {/* Consultation Fee & Booking CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400">Consultation Fee</span>
                  <div className="text-2xl font-black text-slate-900">€{doctor.consultationFee}</div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/book-appointment?doctor=${doctor.id}`}
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with {doctor.name.split(' ')[1]}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Bio & Education */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <h3 className="text-base font-bold text-slate-900 mb-3">About the Physician</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-6 mb-2">
                Specialized Areas of Focus
              </h4>
              <p className="text-sm text-slate-800 font-medium">{doctor.specialty}</p>

              <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Academic Qualifications</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{doctor.education}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Consultation Languages</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{doctor.languages.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">Patient Experiences</h3>
                <span className="text-xs text-brand-600 font-semibold">{doctor.reviewsCount} Verified Reviews</span>
              </div>

              <div className="space-y-4">
                {mockReviews.map((rev, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Schedule & Hospital Facility */}
          <div className="space-y-6">
            {/* Consultation Schedule Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <h3 className="text-base font-bold text-slate-900 mb-3">Consultation Schedule</h3>
              <p className="text-xs text-slate-500 mb-4">Available consultation slots for this specialist:</p>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Working Days
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.availableDays.map((day) => (
                    <span
                      key={day}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Typical Time Slots
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {doctor.scheduleSlots.map((slot) => (
                    <div
                      key={slot}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center font-medium text-slate-700"
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to={`/book-appointment?doctor=${doctor.id}`}
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Select Slot & Book</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Department info */}
            {department && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                <h3 className="text-sm font-bold text-slate-900 mb-2">Hospital Department</h3>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="text-xs font-bold text-brand-700">{department.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{department.description}</p>
                  <div className="mt-2 text-[11px] text-slate-600 flex justify-between">
                    <span>Location:</span>
                    <span className="font-semibold">{department.floor}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
