"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { CUSTOMER_TYPES, INTERESTS, contactSchema, type ContactInput } from "@/lib/validation";

const input = "w-full rounded-md border border-line bg-white px-4 py-3 text-ink placeholder:text-slate-400 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/40";

function Field({ label, error, required, children, htmlFor }: { label: string; error?: string; required?: boolean; children: React.ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label} {required && <span className="text-heat" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-err`} role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { interest: "Learning more", customerType: "Homeowner" } });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setServerError(res.status === 429 ? "Too many requests. Please try again in a few minutes." : json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      reset();
      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact" dark eyebrow="Contact" title="Interested? Let's talk." intro="Tell us a bit about your project and we'll get back to you.">
      <div className="rounded-lg bg-white p-6 text-ink shadow-2xl sm:p-10">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="py-12 text-center" role="status">
              <CheckCircle2 className="mx-auto h-14 w-14 text-energy" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-bold text-navy">Thank you!</h3>
              <p className="mt-2 text-slate-600">We&apos;ve received your request and sent you a confirmation email. We&apos;ll be in touch soon.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-navy underline underline-offset-4">Send another message</button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2" exit={{ opacity: 0 }}>
              <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
                <input id="fullName" autoComplete="name" className={input} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-err" : undefined} {...register("fullName")} />
              </Field>
              <Field label="Email" htmlFor="email" required error={errors.email?.message}>
                <input id="email" type="email" autoComplete="email" className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} {...register("email")} />
              </Field>
              <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
                <input id="phone" type="tel" autoComplete="tel" className={input} {...register("phone")} />
              </Field>
              <Field label="Country / Region" htmlFor="country" error={errors.country?.message}>
                <input id="country" autoComplete="country-name" className={input} {...register("country")} />
              </Field>
              <Field label="Customer type" htmlFor="customerType" required error={errors.customerType?.message}>
                <select id="customerType" className={input} {...register("customerType")}>
                  {CUSTOMER_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Estimated system size (kW)" htmlFor="systemSizeKw" error={errors.systemSizeKw?.message as string | undefined}>
                <input id="systemSizeKw" type="number" step="any" min="0" inputMode="decimal" className={input} {...register("systemSizeKw")} />
              </Field>

              <fieldset className="sm:col-span-2">
                <legend className="mb-1.5 text-sm font-medium text-navy">I&apos;m interested in <span className="text-heat" aria-hidden="true">*</span></legend>
                <div className="flex flex-wrap gap-3">
                  {INTERESTS.map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2 rounded-full border border-line px-4 py-2 text-sm has-[:checked]:border-amber has-[:checked]:bg-amber/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber">
                      <input type="radio" value={o} className="accent-amber" {...register("interest")} /> {o}
                    </label>
                  ))}
                </div>
                {errors.interest && <p role="alert" className="mt-1 text-sm text-red-600">{errors.interest.message}</p>}
              </fieldset>

              <div className="sm:col-span-2">
                <Field label="Message" htmlFor="message" error={errors.message?.message}>
                  <textarea id="message" rows={4} className={input} {...register("message")} />
                </Field>
              </div>

              {/* Honeypot: hidden from users and assistive tech */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-slate-700">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-amber" aria-invalid={!!errors.consent} {...register("consent")} />
                  <span>I agree to be contacted by SamiRodi. See our <a href="/privacy" className="font-medium text-navy underline underline-offset-2">Privacy Policy</a>.</span>
                </label>
                {errors.consent && <p role="alert" className="mt-1 text-sm text-red-600">{errors.consent.message}</p>}
              </div>

              {status === "error" && <p role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-700 sm:col-span-2">{serverError}</p>}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 btn-brass"
                >
                  {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
