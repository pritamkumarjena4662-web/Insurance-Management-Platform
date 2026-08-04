import React, { useState, useMemo } from "react";
import { Search, Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, FileText } from "lucide-react";

/**
 * Claims.jsx
 * Claims management view for an Insurance Management Platform.
 * Self-contained: manages its own state in memory (no backend calls, no localStorage).
 * Drop into an existing React + Tailwind project. Requires: lucide-react.
 *
 * To wire up a real backend, replace the initial `seedClaims` array and the
 * handleAdd / handleEdit / handleDelete functions with your API calls.
 */

const STATUS_STYLES = {
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Rejected: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

const STATUS_OPTIONS = ["Approved", "Pending", "Rejected"];
const PAGE_SIZE = 8;

const seedClaims = [
  { id: "CLM-1001", claimant: "Ravi Kumar", policyNumber: "POL-88213", type: "Auto", amount: 4200, status: "Pending", dateFiled: "2026-07-12" },
  { id: "CLM-1002", claimant: "Anita Desai", policyNumber: "POL-77410", type: "Health", amount: 15800, status: "Approved", dateFiled: "2026-06-28" },
  { id: "CLM-1003", claimant: "Priya Sharma", policyNumber: "POL-33219", type: "Home", amount: 9200, status: "Rejected", dateFiled: "2026-07-01" },
  { id: "CLM-1004", claimant: "Vikram Rao", policyNumber: "POL-99120", type: "Auto", amount: 2100, status: "Approved", dateFiled: "2026-05-19" },
  { id: "CLM-1005", claimant: "Sneha Iyer", policyNumber: "POL-45882", type: "Life", amount: 52000, status: "Pending", dateFiled: "2026-07-20" },
  { id: "CLM-1006", claimant: "Arjun Nair", policyNumber: "POL-21038", type: "Health", amount: 6700, status: "Approved", dateFiled: "2026-04-30" },
  { id: "CLM-1007", claimant: "Meera Pillai", policyNumber: "POL-60911", type: "Home", amount: 13400, status: "Pending", dateFiled: "2026-07-25" },
  { id: "CLM-1008", claimant: "Karan Mehta", policyNumber: "POL-70552", type: "Auto", amount: 3300, status: "Rejected", dateFiled: "2026-06-05" },
  { id: "CLM-1009", claimant: "Divya Menon", policyNumber: "POL-88650", type: "Health", amount: 8900, status: "Approved", dateFiled: "2026-07-02" },
  { id: "CLM-1010", claimant: "Rohan Gupta", policyNumber: "POL-12904", type: "Life", amount: 41000, status: "Pending", dateFiled: "2026-07-29" },
];

function currency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function emptyForm() {
  return { claimant: "", policyNumber: "", type: "Auto", amount: "", status: "Pending", dateFiled: new Date().toISOString().slice(0, 10) };
}

function ClaimModal({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(initial || emptyForm());

  React.useEffect(() => {
    setForm(initial || emptyForm());
  }, [initial, open]);

  if (!open) return null;

  const isEdit = Boolean(initial);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.claimant.trim() || !form.policyNumber.trim() || !form.amount) return;
    onSubmit({ ...form, amount: Number(form.amount) });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="text-sm font-semibold tracking-wide text-slate-100">
            {isEdit ? "Edit claim" : "New claim"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Claimant name</label>
            <input
              value={form.claimant}
              onChange={(e) => handleChange("claimant", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Policy number</label>
              <input
                value={form.policyNumber}
                onChange={(e) => handleChange("policyNumber", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="POL-00000"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Claim type</label>
              <select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {["Auto", "Health", "Home", "Life"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Amount (USD)</label>
              <input
                type="number"
                min="0"
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-400">Date filed</label>
            <input
              type="date"
              value={form.dateFiled}
              onChange={(e) => handleChange("dateFiled", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              {isEdit ? "Save changes" : "Add claim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirm({ open, claim, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
        <h2 className="text-sm font-semibold text-slate-100">Delete claim {claim?.id}?</h2>
        <p className="mt-2 text-sm text-slate-400">
          This will permanently remove {claim?.claimant}'s claim. This action can't be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Claims() {
  const [claims, setClaims] = useState(seedClaims);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return claims.filter((c) => {
      const matchesQuery =
        !q ||
        c.claimant.toLowerCase().includes(q) ||
        c.policyNumber.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [claims, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetPageAnd(fn) {
    return (val) => {
      fn(val);
      setPage(1);
    };
  }

  function handleAddClick() {
    setEditingClaim(null);
    setModalOpen(true);
  }

  function handleEditClick(claim) {
    setEditingClaim(claim);
    setModalOpen(true);
  }

  function handleSubmit(form) {
    if (editingClaim) {
      setClaims((prev) => prev.map((c) => (c.id === editingClaim.id ? { ...c, ...form } : c)));
    } else {
      const nextId = `CLM-${1000 + claims.length + 1 + Math.floor(Math.random() * 90)}`;
      setClaims((prev) => [{ id: nextId, ...form }, ...prev]);
    }
    setModalOpen(false);
    setEditingClaim(null);
  }

  function handleDeleteConfirm() {
    setClaims((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  const totalClaims = claims.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30">
              <FileText size={20} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-50">Claims</h1>
              <p className="text-xs text-slate-500">
                <span className="font-medium text-slate-300">{totalClaims}</span> total claims on file
              </p>
            </div>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-950/40 hover:bg-indigo-500 transition-colors"
          >
            <Plus size={16} />
            Add claim
          </button>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => resetPageAnd(setQuery)(e.target.value)}
              placeholder="Search by claimant, policy number, or claim ID"
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            {["All", ...STATUS_OPTIONS].map((s) => (
              <button
                key={s}
                onClick={() => resetPageAnd(setStatusFilter)(s)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Claim ID</th>
                  <th className="px-5 py-3 font-medium">Claimant</th>
                  <th className="px-5 py-3 font-medium">Policy #</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Filed</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => (
                  <tr key={c.id} className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{c.id}</td>
                    <td className="px-5 py-3 font-medium text-slate-100">{c.claimant}</td>
                    <td className="px-5 py-3 text-slate-400">{c.policyNumber}</td>
                    <td className="px-5 py-3 text-slate-400">{c.type}</td>
                    <td className="px-5 py-3 text-slate-300">{currency(c.amount)}</td>
                    <td className="px-5 py-3 text-slate-400">{c.dateFiled}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEditClick(c)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
                          aria-label={`Edit ${c.id}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
                          aria-label={`Delete ${c.id}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-500">
                      No claims match your search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-800 px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing {paginated.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
              {"–"}
              {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-xs text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ClaimModal
        open={modalOpen}
        initial={editingClaim}
        onClose={() => {
          setModalOpen(false);
          setEditingClaim(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteConfirm
        open={Boolean(deleteTarget)}
        claim={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}