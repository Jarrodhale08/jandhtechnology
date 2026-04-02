"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-white/[0.01]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Build
            <br />
            <span className="gradient-text">Your App?</span>
          </h2>
          <p className="text-[#ababab] text-lg max-w-xl mx-auto">
            Tell us about your idea. We&apos;ll get back to you within 24 hours with honest
            feedback and a clear path forward.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          {status === "sent" ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-[#ababab]">
                Thanks for reaching out. We&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#ababab] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#555] focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#ababab] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#555] focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#ababab] mb-2">
                  Tell us about your app idea
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your app concept, target audience, and any specific features you need..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#555] focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please email us directly at{" "}
                  <a href="mailto:jarrod@jandhtechnology.com" className="underline">
                    jarrod@jandhtechnology.com
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold text-lg transition-colors"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              <p className="text-center text-[#ababab] text-sm">
                Or email us directly at{" "}
                <a
                  href="mailto:jarrod@jandhtechnology.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  jarrod@jandhtechnology.com
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
