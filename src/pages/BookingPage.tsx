import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Video,
  Building,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { doctors, departments, bookAppointment, currentUser } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Wizard Step State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Form State
  const initialDoctorId = searchParams.get('doctor') || (doctors.length > 0 ? doctors[0].id : '');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('all');
  
  // Date selection (default today or tomorrow)
  const todayStr = new Date().toISOString().split('T')[0];
  const [appointmentDate, setAppointmentDate] = useState<string>(todayStr);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [consultationType, setConsultationType] = useState<'in-person' | 'video'>('in-person');

  // Patient info (pre-filled with demo user or customizable)
  const [patientName, setPatientName] = useState<string>(currentUser.role === 'patient' ? currentUser.name : 'Rajesh Kumar');
  const [patientPhone, setPatientPhone] = useState<string>(currentUser.phone || '+33 6 89 44 12 90');
  const [patientEmail, setPatientEmail] = useState<string>(currentUser.email || 'patient@infinexloop.com');
  const [patientAge, setPatientAge] = useState<number>(38);
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [symptoms, setSymptoms] = useState<string>('Regular health checkup & blood pressure review.');

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // If initial doctor has department, sync it
  useEffect(() => {
    if (selectedDoctor) {
      setSelectedDepartmentId(selectedDoctor.departmentId);
    }
  }, [selectedDoctorId]);

  // Handle Booking Submission
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const created = bookAppointment({
      patientName,
      patientPhone,
      patientEmail,
      patientAge: Number(patientAge),
      patientGender,
      doctorId: selectedDoctorId,
      date: appointmentDate,
      timeSlot: selectedTimeSlot,
      type: consultationType,
      symptoms
    });

    setConfirmedAppointment(created);
    setCurrentStep(4);

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered', e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700 mb-2">
            Multi-Step Booking Wizard
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedule Your Clinical Consultation
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
            Select your physician, pick a convenient time slot, and instantly receive your live queue token.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                1
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                Doctor & Specialty
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 2 ? 'bg-brand-600' : 'bg-slate-200'}`}></div>

            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                2
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                Date & Slot
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 3 ? 'bg-brand-600' : 'bg-slate-200'}`}></div>

            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 3 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                Patient Information
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 4 ? 'bg-brand-600' : 'bg-slate-200'}`}></div>

            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                4
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${currentStep >= 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: DOCTOR & SPECIALTY SELECTION */}
        {currentStep === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 1: Choose Your Consulting Doctor</h2>
              <p className="text-xs text-slate-500 mt-1">Select from our roster of board-certified clinical specialists.</p>
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Filter by Department</label>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedDepartmentId('all')}
                  className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                    selectedDepartmentId === 'all'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Departments
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDepartmentId(dept.id)}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                      selectedDepartmentId === dept.id
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Radio Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Doctor</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {doctors
                  .filter((d) => selectedDepartmentId === 'all' || d.departmentId === selectedDepartmentId)
                  .map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-brand-50/70 border-brand-500 ring-2 ring-brand-500/30 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h4>
                            <span className="text-xs font-extrabold text-brand-700">€{doc.consultationFee}</span>
                          </div>
                          <p className="text-[11px] font-semibold text-brand-600">{doc.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{doc.departmentName}</p>
                          <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
                            <span>{doc.roomNumber}</span>
                            <span className="text-emerald-700 font-semibold">★ {doc.rating}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME SLOT SELECTION */}
        {currentStep === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 2: Choose Appointment Schedule</h2>
              <p className="text-xs text-slate-500 mt-1">
                Consulting with <span className="font-semibold text-slate-800">{selectedDoctor?.name}</span> ({selectedDoctor?.departmentName})
              </p>
            </div>

            {/* Consultation Type Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <button
                  type="button"
                  onClick={() => setConsultationType('in-person')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    consultationType === 'in-person'
                      ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-5 h-5 text-brand-600 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">In-Person Clinic Visit</h5>
                    <p className="text-[10px] text-slate-500">{selectedDoctor?.roomNumber}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('video')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    consultationType === 'video'
                      ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/20'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Video Telehealth</h5>
                    <p className="text-[10px] text-slate-500">Virtual Room link</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Consultation Date</label>
              <input
                type="date"
                value={appointmentDate}
                min={todayStr}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full sm:w-64 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50"
              />
            </div>

            {/* Time Slot Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Available Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {(selectedDoctor?.scheduleSlots || ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']).map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Patient Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT INFORMATION & FINAL REVIEW */}
        {currentStep === 3 && (
          <form onSubmit={handleConfirmBooking} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-soft space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Step 3: Patient Information</h2>
              <p className="text-xs text-slate-500 mt-1">Enter patient records for appointment registration and digital queue token.</p>
            </div>

            {/* Quick pre-fill notice */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Pre-filled with active demo profile ({currentUser.name})</span>
              </div>
              <span className="font-semibold text-brand-600">Editable for demo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={patientAge}
                    onChange={(e) => setPatientAge(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chief Symptoms / Reason for Visit</label>
              <textarea
                rows={2}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe your medical concerns or reason for consultation..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-900 mb-2">Consultation Summary</h4>
              <div className="flex justify-between text-slate-600">
                <span>Doctor:</span>
                <span className="font-bold text-slate-900">{selectedDoctor?.name} ({selectedDoctor?.departmentName})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Date & Time:</span>
                <span className="font-bold text-slate-900">{appointmentDate} at {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Consultation Mode:</span>
                <span className="font-semibold text-brand-600 uppercase">{consultationType} ({selectedDoctor?.roomNumber})</span>
              </div>
              <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">Total Consultation Fee:</span>
                <span className="text-base font-extrabold text-brand-700">€{selectedDoctor?.consultationFee}</span>
              </div>
            </div>

            {/* Step 3 Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirm Booking & Generate Queue Token</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMATION & LIVE TOKEN DISPLAY */}
        {currentStep === 4 && confirmedAppointment && (
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {/* Header Success Banner */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Appointment Successfully Booked!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your appointment has been saved to the hospital schedule and a live digital queue token has been assigned.
              </p>
            </div>

            {/* Digital Token Ticket */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-700">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-brand-500/20 blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">
                    MediLoop Care Queue Token
                  </span>
                  <div className="text-xs font-semibold text-slate-300">
                    Ref: {confirmedAppointment.referenceNumber}
                  </div>
                </div>
                <div className="p-2 bg-slate-800 rounded-xl border border-slate-700">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Big Token Number */}
              <div className="my-6 text-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                  Your Queue Token
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  {confirmedAppointment.tokenNumber}
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span>Status: In Waiting Queue</span>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="space-y-2 text-xs border-t border-slate-700/80 pt-4 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-bold text-white">{confirmedAppointment.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Doctor:</span>
                  <span className="font-semibold text-white">{confirmedAppointment.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-white">{confirmedAppointment.departmentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consultation Slot:</span>
                  <span className="font-semibold text-teal-300">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room / Chamber:</span>
                  <span className="font-bold text-white">{selectedDoctor?.roomNumber}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                to="/token-history"
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Track Live Queue Position</span>
              </Link>
              <Link
                to="/my-appointments"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>View My Appointments</span>
              </Link>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Token</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
