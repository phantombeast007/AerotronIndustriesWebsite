import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { CONTACT, SERVICE_OPTIONS } from "../../lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Inquiry sent. We'll respond within 24 hours.");
      setForm(initial);
    } catch (err) {
      const detail = err?.response?.data?.detail || "Unable to submit. Please try again.";
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-slate-50"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)] mb-4">
            // 05 · Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1] text-slate-950 mb-8">
            Start the
            <br />
            conversation.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-10 max-w-md">
            Send your drawings, RFQ or a broad brief — we'll reply with timelines, DFM notes and an
            honest yes/no within one business day.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 border border-slate-300">
                <Phone size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                  Phone
                </div>
                {CONTACT.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="block text-slate-900 hover:text-[color:var(--brand)]"
                    data-testid={`contact-phone-${p.replace(/\s/g, '')}`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-3 border border-slate-300">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                  Email
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-slate-900 hover:text-[color:var(--brand)] break-all"
                  data-testid="contact-email"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>

            {[CONTACT.office, CONTACT.factory].map((a) => (
              <div key={a.label} className="flex gap-4">
                <div className="p-3 border border-slate-300">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-slate-500 uppercase">
                    {a.label}
                  </div>
                  {a.lines.map((l, i) => (
                    <div key={i} className="text-slate-700 text-sm">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="lg:col-span-7 bg-white border border-slate-900 p-6 md:p-10"
          data-testid="contact-form"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Name *" value={form.name} onChange={update("name")} testid="input-name" />
            <Field
              type="email"
              label="Email *"
              value={form.email}
              onChange={update("email")}
              testid="input-email"
            />
            <Field label="Phone" value={form.phone} onChange={update("phone")} testid="input-phone" />
            <Field
              label="Company"
              value={form.company}
              onChange={update("company")}
              testid="input-company"
            />

            <div className="md:col-span-2">
              <Label>Service of Interest</Label>
              <select
                value={form.service}
                onChange={update("service")}
                className="w-full bg-transparent border border-slate-300 focus:border-slate-900 px-4 py-3 outline-none text-slate-900"
                data-testid="input-service"
              >
                <option value="">Select a service —</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <Label>Message *</Label>
              <textarea
                rows={5}
                value={form.message}
                onChange={update("message")}
                className="w-full bg-transparent border border-slate-300 focus:border-slate-900 px-4 py-3 outline-none text-slate-900 resize-none"
                placeholder="Tell us about your project, volumes, materials and target dates."
                data-testid="input-message"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[color:var(--brand)] hover:bg-[color:var(--brand-hover)] disabled:opacity-60 text-white px-8 py-4 text-sm font-semibold transition-colors"
            data-testid="contact-submit"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send Inquiry <Send size={16} />
              </>
            )}
          </button>
          <p className="mt-4 font-mono text-[10px] text-slate-400 tracking-[0.15em]">
            // RESPONSE SLA · WITHIN 24 BUSINESS HOURS
          </p>
        </form>
      </div>
    </section>
  );
}

const Label = ({ children }) => (
  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-2">
    {children}
  </label>
);

const Field = ({ label, type = "text", value, onChange, testid }) => (
  <div>
    <Label>{label}</Label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-slate-300 focus:border-slate-900 px-4 py-3 outline-none text-slate-900"
      data-testid={testid}
    />
  </div>
);
