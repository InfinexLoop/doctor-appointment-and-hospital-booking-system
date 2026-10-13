export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  doctorId?: string;
  departmentId?: string;
  phone?: string;
  title?: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  doctorCount: number;
  headDoctor: string;
  averageWaitTimeMins: number;
  emergencyAvailable: boolean;
  totalBeds: number;
  floor: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  consultationFee: number;
  avatar: string;
  bio: string;
  education: string;
  languages: string[];
  roomNumber: string;
  isAvailableToday: boolean;
  availableDays: string[];
  scheduleSlots: string[];
  maxDailyCapacity: number;
}

export type AppointmentStatus = 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  date: string;
  timeSlot: string;
  type: 'in-person' | 'video';
  status: AppointmentStatus;
  tokenNumber: string;
  symptoms: string;
  notes?: string;
  prescription?: string;
  fee: number;
  createdAt: string;
}

export type TokenStatus = 'waiting' | 'serving' | 'completed' | 'skipped';

export interface QueueToken {
  id: string;
  tokenNumber: string;
  patientName: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  departmentId: string;
  departmentName: string;
  roomNumber: string;
  issueTime: string;
  status: TokenStatus;
  estimatedWaitMins: number;
  calledAt?: string;
  completedAt?: string;
  isWalkIn: boolean;
  appointmentId?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  dosage: string;
  stock: number;
  unitPrice: number;
  manufacturer: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface PaymentRecord {
  id: string;
  appointmentId: string;
  invoiceNumber: string;
  patientName: string;
  doctorName: string;
  departmentName: string;
  amount: number;
  paymentMethod: 'Card' | 'Cash' | 'Insurance' | 'Online';
  status: 'paid' | 'pending' | 'refunded';
  date: string;
}

export interface HospitalStats {
  totalAppointmentsToday: number;
  queueWaitingCount: number;
  queueServingCount: number;
  onDutyDoctors: number;
  roomsOccupied: number;
  totalRevenueToday: number;
  satisfactionRate: number;
}
