import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Department,
  Doctor,
  Appointment,
  AppointmentStatus,
  QueueToken,
  Medicine,
  PaymentRecord,
  HospitalStats
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_QUEUE_TOKENS,
  INITIAL_MEDICINES,
  INITIAL_PAYMENTS
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  loginAs: (role: UserRole, userOverride?: User) => void;
  logout: () => void;
  
  departments: Department[];
  doctors: Doctor[];
  updateDoctorAvailability: (doctorId: string, isAvailableToday: boolean) => void;
  
  appointments: Appointment[];
  bookAppointment: (bookingData: {
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    patientAge: number;
    patientGender: 'Male' | 'Female' | 'Other';
    doctorId: string;
    date: string;
    timeSlot: string;
    type: 'in-person' | 'video';
    symptoms: string;
  }) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  rescheduleAppointment: (id: string, newDate: string, newSlot: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  
  queueTokens: QueueToken[];
  generateWalkInToken: (patientName: string, phone: string, doctorId: string) => QueueToken;
  callNextPatient: (doctorId: string) => QueueToken | null;
  completeConsultation: (tokenId: string, diagnosisNotes?: string, prescription?: string) => void;
  skipToken: (tokenId: string) => void;
  
  medicines: Medicine[];
  updateMedicineStock: (medicineId: string, quantityChange: number) => void;
  
  payments: PaymentRecord[];
  
  stats: HospitalStats;
  resetDemoData: () => void;
  
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage state initialization
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('mediloop_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS[0]; // Default to Admin for full demo showcase
  });

  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('mediloop_doctors');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('mediloop_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_APPOINTMENTS;
  });

  const [queueTokens, setQueueTokens] = useState<QueueToken[]>(() => {
    try {
      const saved = localStorage.getItem('mediloop_queue');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QUEUE_TOKENS;
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const saved = localStorage.getItem('mediloop_medicines');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MEDICINES;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mediloop_payments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PAYMENTS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('mediloop_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('mediloop_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('mediloop_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('mediloop_queue', JSON.stringify(queueTokens));
  }, [queueTokens]);

  useEffect(() => {
    localStorage.setItem('mediloop_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('mediloop_payments', JSON.stringify(payments));
  }, [payments]);

  // Toast Notification handler
  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // User & Role Management
  const loginAs = (role: UserRole, userOverride?: User) => {
    if (userOverride) {
      setCurrentUser(userOverride);
      addToast('success', 'Logged in', `Switched to ${userOverride.name} (${role.toUpperCase()})`);
      return;
    }
    const matched = INITIAL_USERS.find((u) => u.role === role);
    if (matched) {
      setCurrentUser(matched);
      addToast('success', 'Role Switched', `Active session: ${matched.name} (${role.toUpperCase()})`);
    }
  };

  const logout = () => {
    // Revert to demo patient or guest
    const guestUser = INITIAL_USERS.find((u) => u.role === 'patient') || INITIAL_USERS[0];
    setCurrentUser(guestUser);
    addToast('info', 'Logged Out', 'Returned to Public/Patient view');
  };

  // Doctor Availability
  const updateDoctorAvailability = (doctorId: string, isAvailableToday: boolean) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === doctorId ? { ...doc, isAvailableToday } : doc))
    );
    const doctor = doctors.find((d) => d.id === doctorId);
    addToast(
      'info',
      'Doctor Schedule Updated',
      `${doctor?.name} is now marked ${isAvailableToday ? 'On-Duty' : 'Off-Duty'}`
    );
  };

  // Appointment Booking Workflow
  const bookAppointment = (data: {
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    patientAge: number;
    patientGender: 'Male' | 'Female' | 'Other';
    doctorId: string;
    date: string;
    timeSlot: string;
    type: 'in-person' | 'video';
    symptoms: string;
  }): Appointment => {
    const doctor = doctors.find((d) => d.id === data.doctorId);
    const department = departments.find((dept) => dept.id === doctor?.departmentId);

    // Generate token prefix based on department
    let prefix = 'GEN';
    if (department?.id === 'dept_cardio') prefix = 'CARD';
    else if (department?.id === 'dept_ped') prefix = 'PED';
    else if (department?.id === 'dept_derma') prefix = 'DERM';
    else if (department?.id === 'dept_neuro') prefix = 'NEUR';
    else if (department?.id === 'dept_ortho') prefix = 'ORT';
    else if (department?.id === 'dept_opht') prefix = 'OPH';
    else if (department?.id === 'dept_ent') prefix = 'ENT';

    const tokenSeq = 100 + queueTokens.length + 1;
    const tokenNumber = `${prefix}-${tokenSeq}`;
    const appointmentRef = `MLC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newAppointment: Appointment = {
      id: `apt_${Date.now()}`,
      referenceNumber: appointmentRef,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      patientEmail: data.patientEmail,
      patientAge: data.patientAge,
      patientGender: data.patientGender,
      doctorId: data.doctorId,
      doctorName: doctor?.name || 'Assigned Physician',
      departmentId: department?.id || 'dept_gen',
      departmentName: department?.name || 'General Medicine',
      date: data.date,
      timeSlot: data.timeSlot,
      type: data.type,
      status: 'confirmed',
      tokenNumber: tokenNumber,
      symptoms: data.symptoms || 'General Consultation',
      fee: doctor?.consultationFee || 65,
      createdAt: new Date().toISOString()
    };

    // Create corresponding Queue Token for live tracking
    const newQueueToken: QueueToken = {
      id: `tok_${Date.now()}`,
      tokenNumber: tokenNumber,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      doctorId: data.doctorId,
      doctorName: doctor?.name || 'Assigned Physician',
      departmentId: department?.id || 'dept_gen',
      departmentName: department?.name || 'General Medicine',
      roomNumber: doctor?.roomNumber || 'Room 101',
      issueTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      estimatedWaitMins: (queueTokens.filter((q) => q.status === 'waiting' && q.doctorId === data.doctorId).length + 1) * 15,
      isWalkIn: false,
      appointmentId: newAppointment.id
    };

    // Create billing record
    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      appointmentId: newAppointment.id,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      patientName: data.patientName,
      doctorName: doctor?.name || 'Physician',
      departmentName: department?.name || 'General Medicine',
      amount: doctor?.consultationFee || 65,
      paymentMethod: 'Online',
      status: 'paid',
      date: data.date
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setQueueTokens((prev) => [...prev, newQueueToken]);
    setPayments((prev) => [newPayment, ...prev]);

    addToast(
      'success',
      'Appointment Confirmed!',
      `Token ${tokenNumber} issued for ${doctor?.name} on ${data.date} at ${data.timeSlot}`
    );

    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    addToast('info', 'Status Updated', `Appointment status set to ${status}`);
  };

  const rescheduleAppointment = (id: string, newDate: string, newSlot: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, date: newDate, timeSlot: newSlot } : apt))
    );
    addToast('success', 'Appointment Rescheduled', `Updated to ${newDate} at ${newSlot}`);
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled', notes: reason || 'Cancelled by user' } : apt))
    );
    // Also cancel or skip associated queue token
    setQueueTokens((prev) =>
      prev.map((tok) => (tok.appointmentId === id ? { ...tok, status: 'skipped' } : tok))
    );
    addToast('warning', 'Appointment Cancelled', 'The slot and queue token have been released.');
  };

  // Queue Management
  const generateWalkInToken = (patientName: string, phone: string, doctorId: string): QueueToken => {
    const doctor = doctors.find((d) => d.id === doctorId);
    const department = departments.find((dept) => dept.id === doctor?.departmentId);

    const prefix = 'WLK';
    const tokenSeq = 50 + queueTokens.filter((q) => q.isWalkIn).length + 1;
    const tokenNumber = `${prefix}-${tokenSeq}`;

    const newQueueToken: QueueToken = {
      id: `tok_wlk_${Date.now()}`,
      tokenNumber,
      patientName: `${patientName} (Walk-In)`,
      patientPhone: phone,
      doctorId,
      doctorName: doctor?.name || 'General Doctor',
      departmentId: department?.id || 'dept_gen',
      departmentName: department?.name || 'General Medicine',
      roomNumber: doctor?.roomNumber || 'Room 101',
      issueTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting',
      estimatedWaitMins: (queueTokens.filter((q) => q.status === 'waiting' && q.doctorId === doctorId).length + 1) * 15,
      isWalkIn: true
    };

    setQueueTokens((prev) => [...prev, newQueueToken]);
    addToast('success', 'Walk-in Token Issued', `Generated Token ${tokenNumber} for ${doctor?.name}`);
    return newQueueToken;
  };

  const callNextPatient = (doctorId: string): QueueToken | null => {
    // Find next waiting token for this doctor
    const nextWaitingIndex = queueTokens.findIndex(
      (tok) => tok.doctorId === doctorId && tok.status === 'waiting'
    );

    if (nextWaitingIndex === -1) {
      addToast('info', 'Queue Clear', 'No more patients currently waiting for this doctor.');
      return null;
    }

    const nextToken = queueTokens[nextWaitingIndex];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setQueueTokens((prev) =>
      prev.map((tok) => {
        // Mark any current 'serving' token for this doctor as completed
        if (tok.doctorId === doctorId && tok.status === 'serving') {
          return { ...tok, status: 'completed', completedAt: nowTime };
        }
        // Promote the next waiting token to serving
        if (tok.id === nextToken.id) {
          return { ...tok, status: 'serving', calledAt: nowTime, estimatedWaitMins: 0 };
        }
        return tok;
      })
    );

    // If there is an appointment attached, set its status to in-progress
    if (nextToken.appointmentId) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === nextToken.appointmentId ? { ...apt, status: 'in-progress' } : apt))
      );
    }

    addToast(
      'success',
      'Patient Called!',
      `Calling Token ${nextToken.tokenNumber} (${nextToken.patientName}) to ${nextToken.roomNumber}`
    );

    return nextToken;
  };

  const completeConsultation = (tokenId: string, diagnosisNotes?: string, prescription?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetToken = queueTokens.find((t) => t.id === tokenId);

    setQueueTokens((prev) =>
      prev.map((tok) =>
        tok.id === tokenId ? { ...tok, status: 'completed', completedAt: nowTime } : tok
      )
    );

    if (targetToken?.appointmentId) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === targetToken.appointmentId
            ? {
                ...apt,
                status: 'completed',
                notes: diagnosisNotes || apt.notes || 'Consultation completed successfully.',
                prescription: prescription || apt.prescription || 'Regular rest and hydration advised.'
              }
            : apt
        )
      );
    }

    addToast(
      'success',
      'Consultation Finished',
      `Token ${targetToken?.tokenNumber} marked completed and medical record updated.`
    );
  };

  const skipToken = (tokenId: string) => {
    const targetToken = queueTokens.find((t) => t.id === tokenId);
    setQueueTokens((prev) =>
      prev.map((tok) => (tok.id === tokenId ? { ...tok, status: 'skipped' } : tok))
    );
    addToast('warning', 'Token Skipped', `Token ${targetToken?.tokenNumber} skipped.`);
  };

  // Medicine Inventory
  const updateMedicineStock = (medicineId: string, quantityChange: number) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medicineId) {
          const newStock = Math.max(0, med.stock + quantityChange);
          return {
            ...med,
            stock: newStock,
            status: newStock === 0 ? 'out-of-stock' : newStock < 50 ? 'low-stock' : 'in-stock'
          };
        }
        return med;
      })
    );
    addToast('info', 'Inventory Adjusted', 'Pharmacy stock updated.');
  };

  // Hospital Stats Calculation
  const stats: HospitalStats = {
    totalAppointmentsToday: appointments.length,
    queueWaitingCount: queueTokens.filter((q) => q.status === 'waiting').length,
    queueServingCount: queueTokens.filter((q) => q.status === 'serving').length,
    onDutyDoctors: doctors.filter((d) => d.isAvailableToday).length,
    roomsOccupied: new Set(queueTokens.filter((q) => q.status === 'serving').map((q) => q.roomNumber)).size,
    totalRevenueToday: payments.reduce((acc, curr) => acc + (curr.status === 'paid' ? curr.amount : 0), 0),
    satisfactionRate: 98.4
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.removeItem('mediloop_user');
    localStorage.removeItem('mediloop_doctors');
    localStorage.removeItem('mediloop_appointments');
    localStorage.removeItem('mediloop_queue');
    localStorage.removeItem('mediloop_medicines');
    localStorage.removeItem('mediloop_payments');

    setCurrentUser(INITIAL_USERS[0]);
    setDoctors(INITIAL_DOCTORS);
    setAppointments(INITIAL_APPOINTMENTS);
    setQueueTokens(INITIAL_QUEUE_TOKENS);
    setMedicines(INITIAL_MEDICINES);
    setPayments(INITIAL_PAYMENTS);

    addToast('info', 'Demo Data Reset', 'All appointments, queues, and demo records restored to initial state.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: INITIAL_USERS,
        loginAs,
        logout,
        departments,
        doctors,
        updateDoctorAvailability,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        cancelAppointment,
        queueTokens,
        generateWalkInToken,
        callNextPatient,
        completeConsultation,
        skipToken,
        medicines,
        updateMedicineStock,
        payments,
        stats,
        resetDemoData,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
