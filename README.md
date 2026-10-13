# MediLoop Care — Doctor Appointment & Hospital Booking System

> **Client Sales Demonstration — Demo 02 / 15**  
> Developed by [Infinex Loop](https://infinexloop.netlify.app/). All rights reserved.

---

## Overview

**MediLoop Care** is an enterprise-grade Doctor Appointment Scheduling and Real-Time Hospital Waiting Room Queue Management demonstration application. Engineered specifically for high-throughput polyclinics, multi-specialty medical centers, and hospitals, it provides an end-to-end digital journey from appointment booking to live room queue tracking and digital prescription issuance.

This project is a high-fidelity frontend sales demonstration showcasing **Infinex Loop's** custom software architecture, intuitive healthcare UX, and reactive state management capabilities.

---

## Key Features & Functional Modules

### 1. Multi-Step Appointment Booking Wizard
- **Doctor & Specialty Selection**: Filter by 8 hospital departments (Cardiology, Pediatrics, Dermatology, General Medicine, Neurology, Orthopedics, Ophthalmology, ENT) and browse clinical ratings, fees, and chambers.
- **Interactive Schedule Picker**: Select available consultation dates and time slots with instant capacity checks.
- **Consultation Modes**: Choose between **In-Person Clinic Visit** and **Virtual Telehealth Video Consultation**.
- **Digital Token Generation**: Generates automated sequential queue tokens (e.g. `GEN-104`, `CARD-201`) with celebration confetti and print/export readiness.

### 2. Real-Time Hospital Queue Tracking Engine
- **Live Waiting Position Monitor**: Search tokens by ID or patient phone number to track exact position in line (e.g. *"2 patients ahead of you"*).
- **Automated Wait Time Countdown**: Dynamic estimates based on room pacing.
- **Chamber Allocation Alerts**: Immediate notifications when a token transitions from *Waiting* to *Now Serving (Inside Room)*.

### 3. Fullscreen Waiting Room TV Display (`/tv`)
- High-contrast waiting lounge monitor layout designed for wall-mounted TV screens in clinic waiting areas.
- **Large Pulsing "Now Serving" Board** with Room numbers, Token codes, and Doctor names.
- **"Next In Line" Sidebar** with real-time queue rankings.
- **Live Digital Clock** with second-by-second updates.
- **Synthesized Voice / Bell Chime Alert** for token promotions.
- Hospital announcement ticker.

### 4. Role-Based Stakeholder Workspaces (4 Demo Personas)
- **Patient Portal (`/patient/dashboard`)**: Track active queue tokens, view upcoming visit countdowns, and inspect verified doctor prescriptions and diagnosis notes.
- **Doctor Chamber Desk (`/doctor/dashboard`)**: Supervise daily room queue, click **"Call Next Patient"** to advance the clinic queue, record clinical observations, and issue digital prescriptions.
- **Receptionist & Admissions (`/receptionist/dashboard`)**: Front desk tool to check-in booked patients upon arrival and generate immediate walk-in tokens (`WLK-51`).
- **Hospital Administrator (`/admin/dashboard`)**: High-level executive KPIs, Recharts data analytics (weekly consultation volume, department case load, and hourly clinic traffic), roster controls, and billing logs.

### 5. Hospital Operations Sub-Modules
- **Appointments Management (`/admin/appointments`)**: Global searchable roster with reschedule, cancel, and detail modals.
- **Master Queue Control (`/admin/queue`)**: Centralized command over all consultation suites and waiting lounges.
- **Doctors Roster (`/admin/doctors`)**: Real-time on-duty / off-duty scheduling, room allocations, and fee management.
- **Clinical Departments (`/admin/departments`)**: Ward capacities, head physicians, and inpatient metrics.
- **Dispensary & Pharmacy (`/admin/medicines`)**: Medication stock tracking with reactive restock simulators.
- **Billing & Invoices (`/admin/payments`)**: Outpatient consultation fee receipts with printable invoice modals.
- **Hospital Configuration (`/admin/settings`)**: Facility profile, operating policies, and **"Reset Demo Data"** action.

---

## Interactive Demo Personas

| Role | Demo Persona | Email | Purpose |
| :--- | :--- | :--- | :--- |
| **Patient** | Rajesh Kumar | `rajesh.kumar@infinexloop.com` | Booking, live queue token tracker, prescriptions |
| **Doctor** | Dr. Arun Sharma | `arun.sharma@infinexloop.com` | Chamber Room 104, call next patient, write Rx |
| **Receptionist** | Sarah Jenkins | `receptionist@infinexloop.com` | Front desk check-ins & walk-in token issuance |
| **Administrator** | Dr. Arthur Laurent | `admin@infinexloop.com` | Hospital analytics, doctors roster, billing & TV |

Evaluators can switch between personas anytime via the **Role Switcher** in the navigation header or by visiting `/login`.

---

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS + Custom Healthcare Theme
- **Routing**: React Router (DOM) v7
- **Icons**: Lucide React
- **Data Visualizations**: Recharts
- **Celebration Effects**: canvas-confetti
- **State & Persistence**: React Context + localStorage with factory reset
- **Package Manager**: pnpm

---

## Local Setup & Development

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (v9 or higher)

### Installation

```bash
# Clone or navigate to the project directory
cd doctor-appointment-and-hospital-booking-system

# Install dependencies
pnpm install

# Start the local Vite development server
pnpm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build static production bundle
pnpm run build

# Preview the production build locally
pnpm run preview
```

The compiled output in `dist/` is 100% static and optimized for hosting on **Cloudflare Pages**, Netlify, or Vercel.

---

## Demonstration Notice

This application is an interactive sales demonstration developed by **Infinex Loop** to showcase custom healthcare web application design, appointment booking, and real-time queue management architectures. All patient names, medical prescriptions, and doctor records are synthetic.

---

## Developer Attribution

Developed by **[Infinex Loop](https://infinexloop.netlify.app/)**. All rights reserved.  
For custom healthcare software development, enterprise EHR integrations, or booking systems, visit [infinexloop.netlify.app](https://infinexloop.netlify.app/).
