import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PaymentRecord } from '../../types';
import { CreditCard, Search, CheckCircle2, Clock, FileText, Printer, X } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { payments } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const filtered = payments.filter(
    (p) =>
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCollected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <AdminLayout
      title="Billing & Patient Invoices"
      subtitle="Financial records for outpatient consultation fees, insurance claims, and digital receipts"
    >
      <div className="space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue Today</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">€{totalCollected}</div>
            <p className="text-[11px] text-emerald-600 mt-1 font-semibold">100% Verified collections</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoices Issued</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">{payments.length}</div>
            <p className="text-[11px] text-slate-400 mt-1">Automated receipts generated</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settlement Rate</span>
            <div className="text-3xl font-extrabold text-brand-600 mt-1">96.8%</div>
            <p className="text-[11px] text-slate-400 mt-1">Card, Online & Insurance co-pays</p>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice #, patient, physician..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Doctor & Department</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {p.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.patientName}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{p.doctorName}</div>
                      <div className="text-[10px] text-slate-400">{p.departmentName}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{p.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      €{p.amount}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.status === 'paid' ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(p)}
                        className="text-brand-600 hover:text-brand-800 font-bold text-xs"
                      >
                        View Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt Modal */}
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full border border-slate-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" />
                  <h3 className="text-base font-bold text-slate-900">Hospital Billing Receipt</h3>
                </div>
                <button onClick={() => setSelectedReceipt(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Invoice Number:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedReceipt.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="font-semibold text-slate-800">{selectedReceipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-bold text-emerald-700 uppercase">{selectedReceipt.status}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <span className="font-bold text-slate-900">{selectedReceipt.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Physician:</span>
                    <span className="font-semibold text-slate-900">{selectedReceipt.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="text-slate-700">{selectedReceipt.departmentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Channel:</span>
                    <span className="text-slate-800 font-medium">{selectedReceipt.paymentMethod}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-sm">
                  <span className="font-bold text-slate-900">Total Billed:</span>
                  <span className="font-black text-brand-700 text-lg">€{selectedReceipt.amount}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
