import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Building2, Users, Clock, Bed, Plus } from 'lucide-react';

export const AdminDepartmentsPage: React.FC = () => {
  const { departments, doctors } = useApp();

  return (
    <AdminLayout
      title="Hospital Clinical Departments"
      subtitle="Overview of hospital wings, medical director allocations, and bed capacities"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const deptDocs = doctors.filter((d) => d.departmentId === dept.id);

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 uppercase">
                      {dept.floor}
                    </span>
                    {dept.emergencyAvailable ? (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                        Emergency 24/7
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Regular</span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mt-3">{dept.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Head Physician:</span>
                      <span className="font-semibold text-slate-800">{dept.headDoctor}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Assigned Doctors:</span>
                      <span className="font-bold text-brand-600">{deptDocs.length} Specialists</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Ward Capacity:</span>
                      <span className="font-semibold text-slate-700">{dept.totalBeds} Inpatient Beds</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span className="text-slate-400">Avg Queue Wait:</span>
                      <span className="font-bold text-teal-600">~{dept.averageWaitTimeMins} Mins</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="text-[11px] text-slate-500">
                    Status: <span className="font-semibold text-emerald-600">Operational & Accepting Patients</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
