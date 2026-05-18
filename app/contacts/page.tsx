"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import BoardHeader from "@/components/ui/BoardHeader";
import { ENABLE_CONTACTS } from "@/lib/features";
import {
  type Contact,
  deleteContact,
  isValidSolanaPublicKey,
  loadContacts,
  saveContact,
} from "@/lib/storage/contacts";
import { Search, Trash2, UserPlus, Users } from "lucide-react";

function truncateWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

export default function ContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [wallet, setWallet] = useState("");
  const [department, setDepartment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setContacts(loadContacts());
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.wallet.toLowerCase().includes(q) ||
        (c.department?.toLowerCase().includes(q) ?? false),
    );
  }, [contacts, search]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!label.trim()) {
      setFormError("Label is required");
      return;
    }
    if (!isValidSolanaPublicKey(wallet.trim())) {
      setFormError("Invalid Solana wallet address");
      return;
    }

    const created = saveContact({
      label: label.trim(),
      wallet: wallet.trim(),
      department: department.trim() || undefined,
    });
    setContacts((prev) => [...prev, created]);
    setLabel("");
    setWallet("");
    setDepartment("");
    setShowForm(false);
  };

  const confirmDelete = (id: string) => {
    deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
  };

  const payNow = (address: string) => {
    router.push(`/send?recipient=${encodeURIComponent(address)}`);
  };

  if (!ENABLE_CONTACTS) return null;

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface overflow-y-auto">
        <BoardHeader title="Contacts" />
        <section className="p-8 mx-auto w-full max-w-6xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-primary tracking-tight flex items-center gap-2">
                <Users className="h-8 w-8" /> Recipients
              </h2>
              <p className="text-on-surface-variant text-sm mt-1 font-body">
                Saved counterparties for faster private payroll
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-on-primary-container rounded-xl font-black text-xs uppercase tracking-widest"
            >
              <UserPlus size={14} /> Add Contact
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSave}
              className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                    Label
                  </label>
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Acme Design Studio"
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-3 px-4 text-sm text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                    Wallet Address
                  </label>
                  <input
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Solana public key"
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-3 px-4 text-sm text-on-surface font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">
                    Department (optional)
                  </label>
                  <input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Engineering"
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-3 px-4 text-sm text-on-surface"
                  />
                </div>
              </div>
              {formError && (
                <p className="text-xs text-red-400">{formError}</p>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary text-on-primary-container rounded-lg text-xs font-black uppercase tracking-widest"
                >
                  Save Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 border border-outline-variant/30 rounded-lg text-xs font-bold uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
              size={14}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by label or wallet..."
              className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2.5 text-xs text-on-surface border border-outline-variant/10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-on-surface-variant text-sm bg-surface-container-low rounded-xl border border-outline-variant/10">
              No contacts yet. Add your first recipient above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 space-y-4"
                >
                  <h3 className="text-lg font-black text-on-surface">
                    {contact.label}
                  </h3>
                  <p className="text-xs font-mono text-on-surface-variant">
                    {truncateWallet(contact.wallet)}
                  </p>
                  {contact.department && (
                    <span className="inline-block px-2 py-1 rounded-full bg-surface-container-high text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                      {contact.department}
                    </span>
                  )}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => payNow(contact.wallet)}
                      className="flex-1 py-2.5 bg-primary text-on-primary-container rounded-lg text-[10px] font-black uppercase tracking-widest"
                    >
                      Pay Now
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(contact.id)}
                      className="p-2.5 border border-outline-variant/30 rounded-lg text-on-surface-variant hover:text-red-400"
                      aria-label="Delete contact"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {deleteId === contact.id && (
                    <div className="pt-2 border-t border-outline-variant/10 space-y-2">
                      <p className="text-xs text-on-surface-variant">
                        Delete {contact.label}?
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => confirmDelete(contact.id)}
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded text-[10px] font-bold uppercase"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(null)}
                          className="px-3 py-1.5 border border-outline-variant/30 rounded text-[10px] font-bold uppercase"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
