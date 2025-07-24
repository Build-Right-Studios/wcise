import React from 'react';
import { useState } from 'react';
function Registration() {
    const [showCcavenueForm, setShowCcavenueForm] = useState(false);
    const [formData, setFormData] = useState({
  name: '',
  email: '',
  currency: '',
  amount: '',
  paperId: ''
});

  const data = [
    { label: 'Attending The Conference', price: 'USD 200' },
    { label: 'Accompanying Person', price: 'USD 200' },
    {
      label: 'Presentation Only (Proceedings In Soft Copy Only)',
      price: 'USD 200',
    },
  ];
const handlePaymentSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/ccavenue/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const html = await response.text();

    // Open the payment form in same tab
    const blob = new Blob([html], { type: "text/html" });
const url = URL.createObjectURL(blob);
window.location.href = url;  // Replace current page with the form

  } catch (err) {
    console.error("Payment error:", err);
  }

};

  return (
    <div className="w-full">
      <div className="px-4 sm:px-5">
        <h1 className="text-center mt-8 text-4xl font-bold text-[#1d3b58]">
          Registration For Conference
        </h1>

        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          Registration fees
        </h2>
      </div>

      {/* Table 1: Main Registration Fees */}
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border border-blue-900 p-2 font-semibold text-left">CATEGORY</th>
              <th className="border border-blue-900 p-2 font-semibold text-center">
                FOR SCOPUS INDEXED<br className="hidden xs:inline" /> BOOK CHAPTERS
              </th>
              <th className="border border-blue-900 p-2 font-semibold text-center">
                FOR SCOPUS INDEXED<br className="hidden xs:inline" /> JOURNALS
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
              <td className="border border-blue-900 p-2">USD 300</td>
              <td className="border border-blue-900 p-2">USD 550</td>
              <td className="border border-blue-900 p-2">USD 200</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-blue-900 p-2 text-left">
                <span className="font-semibold block">Delegates With Paper</span>
                Publication (Academician)
              </td>
              <td className="border border-blue-900 p-2">USD 350</td>
              <td className="border border-blue-900 p-2">USD 600</td>
              <td className="border border-blue-900 p-2">USD 250</td>
            </tr>
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left">
                <span className="font-semibold block">Delegates With Paper</span>
                Publication (Industrial)
              </td>
              <td className="border border-blue-900 p-2">USD 450</td>
              <td className="border border-blue-900 p-2">USD 650</td>
              <td className="border border-blue-900 p-2">USD 350</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: Without Publication */}
      <div className="px-4 sm:px-5">
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          Without publication (Other Categories)
        </h2>
      </div>
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <tbody className="text-center font-medium">
            {data.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border border-blue-900 p-2 text-left font-semibold w-3/4">
                  {row.label}
                </td>
                <td className="border border-blue-900 p-2 w-3/4">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: WCISE Award */}
      <div className="px-4 sm:px-5">
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          WCISE'23 Awards
        </h2>
      </div>
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <tbody className="text-center font-medium">
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left font-semibold w-3/4">
                The Award Ceremony
              </td>
              <td className="border border-blue-900 p-2 font-semibold w-3/4">USD 200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Workshop */}
      <div className="px-4 sm:px-5">
        <h2 className="text-center md:text-left mt-8 text-2xl sm:text-3xl font-bold text-[#1d3b58]">
          TECHNICAL RESEARCH ORIENTED WORKSHOP (FOR ANY ONE WORKSHOP)
        </h2>
      </div>
      <div className="w-full px-4 sm:px-5 py-4">
        <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
          <tbody className="text-center font-medium">
            <tr className="bg-white">
              <td className="border border-blue-900 p-2 text-left font-semibold w-3/4">
                One Day (30th December 2023)
              </td>
              <td className="border border-blue-900 p-2 font-semibold w-3/4">USD 200</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAYMENT SECTION */}
      <div className="w-full px-6 py-20 bg-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-20 max-w-7xl mx-auto">
          <img
            src="./src/images/payment.png"
            alt="Pay Icon"
            className="w-32 sm:w-40 md:w-48 lg:w-60 xl:w-72"
          />

          <div className="flex flex-col items-center gap-12 text-center lg:text-left w-full max-w-3xl">
            <h2 className="text-5xl sm:text-6xl font-bold text-[#1d3b58] mb-10">PAYMENT</h2>

            <div className="flex flex-col md:flex-row gap-12 items-start justify-between w-full">
              <div className="flex flex-col items-center md:items-start w-full text-lg">
                <div className="bg-[#1d3b58] text-white px-10 py-4 rounded-full font-semibold text-2xl mb-4 text-center">
                  Payment with PayUmoney
                </div>
                <p className="text-[#1d3b58] font-semibold text-xl mb-1">(Payment in INR)</p>
                <p className="text-[#1d3b58] text-base leading-relaxed mb-4 text-justify">
                  For payment & registration, select category and click PayUmoney.
                </p>
                <select className="px-6 py-3 border-2 border-[#1d3b58] font-bold text-[#1d3b58] rounded w-full text-lg">
                  <option>Select</option>
                  <option>Conference Registration Fees</option>
                  <option>Technical Workshop Fees</option>
                  <option>WCISE Award Fees</option>
                </select>
              </div>

              <div className="flex flex-col items-center md:items-start w-full text-lg">
                <div className="bg-[#1d3b58] text-white px-10 py-4 rounded-full font-semibold text-2xl mb-4 text-center">
                  Payment with CCAvenue
                </div>
                <p className="text-[#1d3b58] font-semibold text-xl mb-1">(Payment in USD/INR)</p>
                <p className="text-[#1d3b58] text-base leading-relaxed mb-4 text-justify">
                  For payment & registration, click CCAvenue.
                </p>
                <button className="px-8 py-4 border-2 border-[#1d3b58] font-bold bg-[#1d3b58] text-white text-xs hover:bg-[#3e5f81] hover:text-[#e0e7ef] hover:text-xl transition-all w-full max-w-xs cursor-pointer" onClick={() => setShowCcavenueForm(true)}>
  PAY WITH CCAVENUE
</button>
{showCcavenueForm && (
  <div className="mt-8 border p-6 rounded-lg shadow-md bg-gray-50 w-full">
    <h3 className="text-xl font-bold mb-4 text-[#1d3b58]">Payment Details</h3>

    <form
        onSubmit={handlePaymentSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center mb-4">Conference Registration</h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full border px-4 py-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-4 py-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <select
          className="w-full border px-4 py-2"
          value={formData.currency}
          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border px-4 py-2"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />

        <input
          type="text"
          placeholder="Paper ID"
          className="w-full border px-4 py-2"
          value={formData.paperId}
          onChange={(e) => setFormData({ ...formData, paperId: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Proceed to Pay
        </button>
      </form>
  </div>
)}


              </div>
            </div>
          </div>

          <img
            src="./src/images/cash.png"

            alt="Cash Icon"
            className="w-28 sm:w-36 md:w-44 lg:w-56 xl:w-64"
          />
        </div>
      </div>

<div className="w-full p-0 bg-white text-[#1d3b58] text-justify">
  <div className="max-w-4xl mx-auto p-4">
    <h2 className="text-3xl mt-15 sm:text-4xl font-bold mb-8">The Registration fee includes:</h2>
    <ul className="space-y-2 text-lg leading-relaxed">
      <li className="flex items-start"><span className="text-2xl mr-3">•</span>Access to all sessions including keynotes.</li>
      <li className="flex items-start">
        <span className="text-2xl mr-3">•</span>
        <div>
          Full length paper publication in the Peer Reviewed International Journals up to 8-10 pages.
          <p className="mt-2 ml-4">Extra Pages Charges beyond 10 pages:</p>
          <ul className="mt-2 ml-8 list-disc space-y-2 text-base">
            <li><strong>SCOPUS INDEXED Journal:</strong> INR 1500 / USD 20 per page</li>
            <li><strong>DOI Indexed & UGC approved Journals:</strong> INR 1000 / USD 10 per page</li>
          </ul>
        </div>
      </li>
      <li className="flex items-start"><span className="text-2xl mr-3">•</span>E-Certificate of presentation/attendance, hard copy on request.</li>
    </ul>
  </div>
</div>


      {/* Note & Important */}
      <div className="w-auto px-6 sm:px-10 py-2 bg-white text-[#1d3b58]">
        <div className="max-w-7xl mx-auto space-y-2 text-lg sm:text-xl leading-relaxed">
          <div>
            <p className="font-bold text-3xl mt-10 sm:text-4xl mb-6 text-justify">Note :</p>
            <p className='text-justify'>
              Registration fee is non-refundable. If the paper doesn’t get published in the registered category, only 50% is refundable. At least one author must register to ensure publication. All attending authors must register separately.
            </p>
          </div>
          <div>
            <p className="font-bold text-3xl mt-15 sm:text-4xl mb-6 text-justify">Important :</p>
            <ul className="list-disc ml-8 space-y-5">
              <li><strong>Authors/Delegates/Participants from INDIA</strong> can pay in INR via PayUmoney (1$ = ₹74).</li>
              <li><strong>Others (outside India)</strong> can pay in USD via CCAvenue.</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
}


export default Registration;