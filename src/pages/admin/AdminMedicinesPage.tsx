import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Pill, Search, Plus, AlertTriangle, CheckCircle2, RotateCw } from 'lucide-react';

export const AdminMedicinesPage: React.FC = () => {
  const { medicines, updateMedicineStock } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout
      title="Hospital Dispensary & Pharmacy Inventory"
      subtitle="Track pharmaceutical stock levels, prescription medications, and hospital dispensary inventory"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medication, category, lab..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            {medicines.length} Pharmaceutical items monitored
          </div>
        </div>

        {/* Medicines Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Medication Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Dosage / Form</th>
                  <th className="py-3 px-4">Manufacturer</th>
                  <th className="py-3 px-4">Current Stock</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Inventory Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {med.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{med.category}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">{med.dosage}</td>
                    <td className="py-3.5 px-4 text-slate-500">{med.manufacturer}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {med.stock} Units
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      €{med.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      {med.status === 'in-stock' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          In Stock
                        </span>
                      )}
                      {med.status === 'low-stock' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Low Stock
                        </span>
                      )}
                      {med.status === 'out-of-stock' && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => updateMedicineStock(med.id, 50)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-bold text-[11px] transition-colors"
                      >
                        +50 Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
