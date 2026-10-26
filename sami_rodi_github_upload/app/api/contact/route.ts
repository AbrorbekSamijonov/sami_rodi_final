import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { BRAND } from "@/lib/config";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  // 1. Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  // 2. Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  // 3. Honeypot: pretend success so bots learn nothing
  if (typeof body === "object" && body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // 4. Store lead
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      full_name: d.fullName,
      email: d.email,
      phone: d.phone || null,
      country: d.country || null,
      customer_type: d.customerType,
      interest: d.interest,
      system_size_kw: d.systemSizeKw ?? null,
      message: d.message || null,
      consent: d.consent,
      source: "website",
    });
    if (error) throw error;
  } catch (err) {
    console.error("Lead insert failed", err);
    return NextResponse.json({ success: false, error: "Could not save your request. Please try again." }, { status: 500 });
  }

  // 5. Emails (best effort: the lead is already saved)
  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.LEADS_NOTIFY_EMAIL;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const from = process.env.RESEND_FROM_EMAIL || `${BRAND.name} <onboarding@resend.dev>`;
    try {
      const jobs = [];
      if (notify) {
        jobs.push(
          resend.emails.send({
            from,
            to: notify,
            replyTo: d.email,
            subject: `New lead: ${d.fullName} (${d.interest})`,
            html: `<h2>New SamiRodi lead</h2>
              <p><b>Name:</b> ${esc(d.fullName)}<br/><b>Email:</b> ${esc(d.email)}<br/>
              <b>Phone:</b> ${esc(d.phone || "-")}<br/><b>Country:</b> ${esc(d.country || "-")}<br/>
              <b>Type:</b> ${esc(d.customerType)}<br/><b>Interest:</b> ${esc(d.interest)}<br/>
              <b>System size:</b> ${d.systemSizeKw ?? "-"} kW</p>
              <p><b>Message:</b><br/>${esc(d.message || "-").replace(/\n/g, "<br/>")}</p>`,
          })
        );
      }
      jobs.push(
        resend.emails.send({
          from,
          to: d.email,
          subject: `Thanks for contacting ${BRAND.name}`,
          html: `<p>Hi ${esc(d.fullName)},</p>
            <p>Thanks for your interest in ${BRAND.name}. We've received your request and will get back to you shortly.</p>
            <p>— The ${BRAND.name} team</p>`,
        })
      );
      await Promise.all(jobs);
    } catch (err) {
      console.error("Email send failed", err);
    }
  }

  return NextResponse.json({ success: true });
}
