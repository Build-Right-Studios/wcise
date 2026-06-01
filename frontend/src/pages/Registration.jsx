import React, { useState } from 'react';
import { BACKEND_URL } from '../constant';

// ─── Razorpay helpers ────────────────────────────────────────────────────────

const CATEGORIES = [
  "Conference Registration Fees",
  "Technical Workshop Fees",
  "WCISE Award Fees",
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Main Component ──────────────────────────────────────────────────────────

function Registration() {
  // Payment form state
  const [category, setCategory] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", paperId: "", amount: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const amount = parseFloat(form.amount) || 0;

  // Registration fee table data
  const withoutPublicationData = [
    { label: 'Attending The Conference', price: 'USD 200' },
    { label: 'Accompanying Person', price: 'USD 200' },
    { label: 'Presentation Only (Proceedings In Soft Copy Only)', price: 'USD 200' },
  ];

  // ─── Validation ──────────────────────────────────────────────────────────

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "10-digit phone required";
    if (!category) e.category = "Please select a category";
    if (!form.amount || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    return e;
  };

  // ─── Razorpay Payment Handler ─────────────────────────────────────────────

  const handlePay = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setErrors({});
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      // 1. Create order on backend
      const orderRes = await fetch(`${BACKEND_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          category,
          paperId: form.paperId,
          email: form.email,
          name: form.name,
        }),
      });

      if (!orderRes.ok) {
        const errBody = await orderRes.json().catch(() => ({}));
        console.error("Create order failed:", orderRes.status, errBody);
        throw new Error(errBody.error || `Order creation failed (${orderRes.status})`);
      }
      const { orderId, amount: orderAmount, currency, keyID } = await orderRes.json();

      // 2. Open Razorpay checkout
      const options = {
        key: keyID,
        amount: orderAmount,
        currency,
        name: "WCISE Conference",
        description: category,
        order_id: orderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#1d3b58" },
        handler: async (response) => {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${BACKEND_URL}/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: form.name,
              email: form.email,
              category,
              paperId: form.paperId,
            }),
          });

          if (verifyRes.ok) {
            setSuccess(response.razorpay_payment_id);
            setForm({ name: "", email: "", phone: "", paperId: "", amount: "" });
            setCategory("");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (res) => {
        alert(`Payment failed: ${res.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      alert(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────────────────

  const SuccessScreen = () => (
    <div className="w-full bg-white py-24 px-6 flex items-center justify-center">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-[#1d3b58] mb-3">Payment Successful</h2>
        <p className="text-[#1d3b58]/60 mb-2 text-sm">Payment ID</p>
        <p className="font-mono text-sm bg-gray-50 border border-gray-200 rounded px-4 py-2 inline-block text-[#1d3b58] mb-8">
          {success}
        </p>
        <p className="text-[#1d3b58]/50 text-sm">Payment received successfully. Please keep the Payment ID for future reference.</p>
        <button
          onClick={() => setSuccess(null)}
          className="mt-8 text-sm text-[#1d3b58]/50 underline underline-offset-4 hover:text-[#1d3b58] transition-colors"
        >
          Make another payment
        </button>
      </div>
    </div>
  );

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="w-full">

      {/* ── Page Title ── */}
      <div className="px-4 sm:px-5">
        <h1 className="text-center mt-8 text-4xl font-bold text-[#1d3b58]">
          Registration For Conference
        </h1>
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          Registration fees
        </h2>
      </div>

      {/* ── Table 1: Main Registration Fees ── */}
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border border-blue-900 p-2 font-semibold text-left">CATEGORY</th>
              <th className="border border-blue-900 p-2 font-semibold text-center">
                FOR SCOPUS INDEXED<br className="hidden xs:inline" /> BOOK CHAPTERS
              </th>
              <th className="border border-blue-900 p-2 font-semibold text-center">
                FOR NON-SCOPUS<br className="hidden xs:inline" /> JOURNALS
              </th>
            </tr>
          </thead>
          <tbody className="font-medium text-center">
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left">
                <span className="font-semibold block">Student/ Research Scholar</span>
                With Paper Publication
              </td>
              <td className="border border-blue-900 p-2">USD 550</td>
              <td className="border border-blue-900 p-2">USD 300</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-blue-900 p-2 text-left">
                <span className="font-semibold block">Delegates With Paper</span>
                Publication (Academician)
              </td>
              <td className="border border-blue-900 p-2">USD 600</td>
              <td className="border border-blue-900 p-2">USD 350</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left">
                <span className="font-semibold block">Delegates With Paper</span>
                Publication (Industrial)
              </td>
              <td className="border border-blue-900 p-2">USD 650</td>
              <td className="border border-blue-900 p-2">USD 450</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Table 2: Without Publication ── */}
      <div className="px-4 sm:px-5">
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          Without publication (Other Categories)
        </h2>
      </div>
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <tbody className="text-center font-medium">
            {withoutPublicationData.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border border-blue-900 p-2 text-left font-semibold w-3/4">{row.label}</td>
                <td className="border border-blue-900 p-2 w-1/4">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Table 3: WCISE Award ── */}
      <div className="px-4 sm:px-5">
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          WCISE'26 Awards
        </h2>
      </div>
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <tbody className="text-center font-medium">
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left font-semibold w-3/4">The Award Ceremony</td>
              <td className="border border-blue-900 p-2 font-semibold w-1/4">USD 200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PAYMENT SECTION — Razorpay
      ══════════════════════════════════════════════════════════════════════ */}

      {success ? (
        <SuccessScreen />
      ) : (
        <section className="w-full mt-10">

          {/* ── Dark header ── */}
          <div className="bg-[#0f2236] px-6 py-10 sm:py-12">
            <div className="max-w-5xl mx-auto">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.15em] mb-2">Secure checkout</p>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
                  Registration &amp; Payment
                </h2>
                <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 text-white/40 text-xs px-3 py-1.5 rounded self-start sm:self-auto">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Powered by Razorpay
                </span>
              </div>
            </div>
          </div>

          {/* ── Two-column body ── */}
          <div className="max-w-5xl mx-auto border-x border-b border-[#1d3b58]/12 grid grid-cols-1 lg:grid-cols-[1fr_360px]">

            {/* LEFT — Form */}
            <div className="px-6 sm:px-10 py-10 border-b lg:border-b-0 lg:border-r border-[#1d3b58]/12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1d3b58]/40 mb-8">
                Your details
              </p>

              {/* Category */}
              <div className="mb-7">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full appearance-none bg-transparent border-b-[1.5px] py-2.5 pr-8 text-sm text-[#1d3b58] outline-none transition-colors cursor-pointer ${errors.category ? "border-red-400" : "border-[#1d3b58]/25 focus:border-[#1d3b58]"
                      }`}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <svg className="absolute right-1 top-3 w-3.5 h-3.5 text-[#1d3b58]/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {errors.category && <p className="mt-1 text-red-500 text-xs">{errors.category}</p>}
              </div>

              {/* Amount */}
              <div className="mb-7">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-0 top-2.5 text-sm text-[#1d3b58]/40 pointer-events-none">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter amount in INR"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className={`w-full bg-transparent border-b-[1.5px] py-2.5 pl-5 text-sm text-[#1d3b58] placeholder-[#1d3b58]/25 outline-none transition-colors ${errors.amount ? "border-red-400" : "border-[#1d3b58]/25 focus:border-[#1d3b58]"
                      }`}
                  />
                </div>
                {errors.amount && <p className="mt-1 text-red-500 text-xs">{errors.amount}</p>}
              </div>
              {/* Name */}
              <div className="mb-7">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">Full name</label>
                <input
                  type="text"
                  placeholder="Dr. Ananya Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full bg-transparent border-b-[1.5px] py-2.5 text-sm text-[#1d3b58] placeholder-[#1d3b58]/25 outline-none transition-colors ${errors.name ? "border-red-400" : "border-[#1d3b58]/25 focus:border-[#1d3b58]"
                    }`}
                />
                {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
              </div>

              {/* Email + Phone side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 mb-7">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@institution.ac.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full bg-transparent border-b-[1.5px] py-2.5 text-sm text-[#1d3b58] placeholder-[#1d3b58]/25 outline-none transition-colors ${errors.email ? "border-red-400" : "border-[#1d3b58]/25 focus:border-[#1d3b58]"
                      }`}
                  />
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full bg-transparent border-b-[1.5px] py-2.5 text-sm text-[#1d3b58] placeholder-[#1d3b58]/25 outline-none transition-colors ${errors.phone ? "border-red-400" : "border-[#1d3b58]/25 focus:border-[#1d3b58]"
                      }`}
                  />
                  {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
                </div>
              </div>

              {/* Paper ID */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50 mb-2">
                  Reference ID{" "}
                  <span className="normal-case font-normal tracking-normal text-[#1d3b58]/35">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="WCISE-2025-042"
                  value={form.paperId}
                  onChange={(e) => setForm({ ...form, paperId: e.target.value })}
                  className="w-full bg-transparent border-b-[1.5px] border-[#1d3b58]/25 focus:border-[#1d3b58] py-2.5 text-sm text-[#1d3b58] placeholder-[#1d3b58]/25 outline-none transition-colors"
                />
                <p className="mt-1.5 text-[11px] text-[#1d3b58]/35">Leave blank if not presenting a paper</p>
              </div>
            </div>

            {/* RIGHT — Summary + CTA */}
            <div className="px-6 sm:px-8 py-10 bg-[#f7f9fb] flex flex-col gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1d3b58]/40 mb-5">
                  Order summary
                </p>

                {/* Summary card */}
                <div className="border border-[#1d3b58]/10 rounded-xl bg-white p-5">
                  {category ? (
                    <>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className="text-[#1d3b58]/65 text-sm leading-snug">{category}</span>
                        <span className="text-[#1d3b58] font-semibold text-sm whitespace-nowrap">
                          ₹{amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="border-t border-[#1d3b58]/8 pt-4 flex justify-between items-baseline">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1d3b58]/50">Total due</span>
                        <span className="text-[#0f2236] font-bold text-2xl">
                          ₹{amount.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {form.paperId && (
                        <p className="mt-3 text-[11px] text-[#1d3b58]/35 border-t border-[#1d3b58]/8 pt-3">
                          Reference ID: {form.paperId}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-10 h-10 rounded-lg bg-[#1d3b58]/5 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-[#1d3b58]/25" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-[#1d3b58]/30 text-sm">Select a category to see pricing</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={loading || !category}
                className={`w-full py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-150 flex items-center justify-center gap-2.5 ${loading || !category
                    ? "bg-[#1d3b58]/15 text-[#1d3b58]/30 cursor-not-allowed"
                    : "bg-[#1d3b58] text-white hover:bg-[#162d46] active:scale-[0.99]"
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pay {amount ? `₹${amount.toLocaleString("en-IN")}` : "—"} securely
                  </>
                )}
              </button>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-5">
                {[
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "SSL" },
                  { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", label: "PCI DSS" },
                  { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Instant" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-1 text-[#1d3b58]/30">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                    </svg>
                    <span className="text-[11px]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Accepted methods */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#1d3b58]/25 text-center mb-3">Accepted methods</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["UPI", "Net Banking", "Debit / Credit", "Wallets"].map((m) => (
                    <span
                      key={m}
                      className="border border-[#1d3b58]/15 rounded px-2.5 py-1 text-[11px] text-[#1d3b58]/45"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Registration Fee Includes ── */}
      <div className="w-full p-0 bg-white text-[#1d3b58] text-justify">
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">The Registration fee includes:</h2>
          <ul className="space-y-2 text-lg leading-relaxed">
            <li className="flex items-start">
              <span className="text-2xl mr-3">•</span>
              Access to all sessions including keynotes.
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">•</span>
              <div>
                Full length paper publication in the Peer Reviewed International Journals up to 8-10 pages.
                <p className="mt-2 ml-4">Extra Pages Charges beyond 10 pages:</p>
                <ul className="mt-2 ml-8 list-disc space-y-2 text-base">
                  <li><strong>SCOPUS INDEXED Journal:</strong> INR 1500 / USD 20 per page</li>
                  <li><strong>DOI Indexed &amp; UGC approved Journals:</strong> INR 1000 / USD 10 per page</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-2xl mr-3">•</span>
              E-Certificate of presentation/attendance, hard copy on request.
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default Registration;