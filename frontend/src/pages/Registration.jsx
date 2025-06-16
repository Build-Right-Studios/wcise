import React,{useState} from 'react'

function Registration() {
  const data = [
    { label: 'Attending The Conference', price: 'USD 200' },
    { label: 'Accompanying Person', price: 'USD 200' },
    {
      label: 'Presentation Only (Proceedings In Soft Copy Only)',
      price: 'USD 200',
    },
  ];
  return (
    <div>
      <div>
        <h1 className="text-center mt-8 text-4xl font-bold text-[#1d3b58] px-10">
  Registration For Conference
</h1>
          <h2 className='text-left mt-8 text-3xl font-bold text-[#1d3b58] px-5'>Registration fees</h2>
      </div>
    <div className="w-full px-2 py-4">
      <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="border border-blue-900 p-2 font-semibold text-left">
              CATEGORY
            </th>
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
    <div><h2 className='text-left mt-8 text-3xl font-bold text-[#1d3b58] px-5'>Without publication (Other Categories)</h2></div>
    <div className="w-full px-2 py-4">
      <table className="w-full border-collapse border border-blue-900 text-[10px] xs:text-xs sm:text-sm text-blue-900">
        <tbody className="text-center font-medium">
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className="border border-blue-900 p-2 text-left font-semibold">
                {row.label}
              </td>
              <td className="border border-blue-900 p-2">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Registration