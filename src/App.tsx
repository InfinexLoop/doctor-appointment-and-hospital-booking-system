import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Public Pages
import { Home } from './pages/Home';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { BookingPage } from './pages/BookingPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { TokenHistoryPage } from './pages/TokenHistoryPage';
import { TVDisplayPage } from './pages/TVDisplayPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';

// Dashboards
import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { ReceptionistDashboard } from './pages/dashboards/ReceptionistDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

// Admin Submodules
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminQueuePage } from './pages/admin/AdminQueuePage';
import { AdminDoctorsPage } from './pages/admin/AdminDoctorsPage';
import { AdminDepartmentsPage } from './pages/admin/AdminDepartmentsPage';
import { AdminMedicinesPage } from './pages/admin/AdminMedicinesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top on navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main Public Layout with Header and Footer
const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          {/* Public Website Flow */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctor/:id" element={<DoctorDetailPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/book-appointment" element={<BookingPage />} />
            <Route path="/my-appointments" element={<MyAppointmentsPage />} />
            <Route path="/token-history" element={<TokenHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Standalone Fullscreen Waiting Room TV Monitor */}
          <Route path="/tv" element={<TVDisplayPage />} />
          <Route path="/admin/queue/tv" element={<TVDisplayPage />} />

          {/* Authentication & Role Selection Hub */}
          <Route path="/login" element={<LoginPage />} />

          {/* Role Dashboards */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/clinic/dashboard" element={<AdminDashboard />} />

          {/* Admin Operations Management */}
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
          <Route path="/admin/queue" element={<AdminQueuePage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/departments" element={<AdminDepartmentsPage />} />
          <Route path="/admin/medicines" element={<AdminMedicinesPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/hospital-management" element={<AdminSettingsPage />} />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
