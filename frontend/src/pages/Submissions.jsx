import React from 'react'
import submission_img from "../images/submission_img.jpg";
import submission_img2 from "../images/submission_img2.png";
import { Link } from "react-router-dom";

function Submissions() {
  return (
    <div>
      {/* First Page */}
      <div className="bg-blue-800 text-white flex flex-col items-center min-h-screen px-4 pt-10 ">
        <h2 className="text-5xl font-semibold mb-3 text-center mt-13"> Paper Submission & Publication </h2>
        <p className="text-center max-w-2xl mt-5 mb-10 text-md ">
          Research papers are invited for submission in WCISE'26. All the full length accepted papers of WCISE will be published in the peer reviewed SCOPUS Indexed Book Chapter and Non-SCOPUS Journals.
        </p>
        <div className="bg-gray-200 rounded-2xl w-full max-w-[700px] h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden shadow-md mb-2">
          <img
            src={submission_img}
            alt="Submission"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
      {/* Second Page */}
      <div className="bg-white items-center min-h-screen">
        <h2 className="text-4xl text-black font-bold mt-18 text-center">Submit Your Research</h2>
        <p className="text-gray-600 text-center mt-5 mb-6 text-lg">
          Authors are invited to submit their papers through our submission portal.
        </p>

        <div className="flex flex-col items-center gap-4">
          {/* Internal Submission */}
          <Link to="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300">
              Submit via Portal
            </button>
          </Link>

          {/* Divider */}
          <p className="text-gray-500 text-sm">OR</p>

          {/* EasyChair External Submission */}
          <a
            href="https://easychair.org/conferences/?conf=wcise26"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300">
              Submit via EasyChair
            </button>
          </a>
        </div>

        <h2 className="text-4xl text-black font-bold text-center mt-25">
          Submitted papers must comply with plagiarism policy and procedures
        </h2>

        <div className="flex flex-row justify-center items-center gap-10 max-w-4xl mt-20 ml-70">
          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm  flex-1 transition-transform duration-300 hover:-translate-y-2">
            <div className="text-3xl mb-3 ml-35">⚠️</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2 mt-10">
              Compliance Required
            </h4>
            <p className="text-gray-600 text-sm">
              All submitted papers must comply with plagiarism policy and
              procedures
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-2xl shadow-sm items-center flex-1  duration-300 hover:-translate-y-2">
            <div className="text-3xl mb-3 ml-35 ">✔️</div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2 mt-8">
              Acceptable Limit
            </h4>
            <p className="text-gray-600 text-sm">
              All submissions must be plagiarism free and up to 10% acceptable
              limit
            </p>
          </div>
        </div>
      </div>

      {/* Third Page */}
      <div className="bg-gray-100 py-16 px-6 min-h-screen">

        <h2 className="text-5xl font-bold text-center text-gray-800 mb-18 mt-9">
          Publication Timeline
        </h2>


        <div className="grid  md:grid-cols-3 gap-10 max-w-6xl max-h-15xl mx-auto">

          <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition border-l-3 border-blue-800">
            <div className="text-4xl mb-3">📘</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              SCOPUS Indexed Book Chapter/Journals
            </h3>
            <p className="text-gray-600 text-sm">
              The publication process for the full length papers registered under the category of SCOPUS Indexed International Journals will take maximum of six months after the conference.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition border-l-3 border-blue-800">
            <div className="text-4xl mb-3">📗</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              SCI Indexed Journals
            </h3>
            <p className="text-gray-600 text-sm">
              Papers under SCI journals will be published about 9 months after the
              conference.
            </p>
          </div>


          <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition border-l-3 border-blue-800">
            <div className="text-4xl mb-3">📙</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              NON SCOPUS Category
            </h3>
            <p className="text-gray-600 text-sm">
              The publication process for the full length papers registered under NON SCOPUS category/DOI Indexed/UGC approved International Journals will take 3-6 month after the conference.
              All submissions must be plagiarism free and upto 10 % acceptable limit.
            </p>
          </div>
        </div>


        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm text-gray-700 border-t-3 border-blue-800">
          <h4 className="text-lg font-bold text-center text-gray-800 mb-3">
            Note For Authors
          </h4>
          <p className="text-sm leading-relaxed text-justify">
            The corresponding authors of accepted papers are required to please fill, complete, sign and send the copyright form along with the Camera Ready as per Conference Template. Failure to comply, the paper will not be considered for the publication. All submissions must be plagiarism free and upto 10 % acceptable limit. The tentative journals (including SCOPUS/SCI indexed) associated/to be associated for publication consideration for the registered and accepted full length paper of WCISE are listed below:
          </p>
        </div>
      </div>

      {/* Fourth Page */}
      <div className="bg-gray-50 py-16 px-6 min-h-screen">

        <h2 className="text-5xl font-bold text-center text-gray-900 mb-3">
          Publication Options
        </h2>
        <p className="text-center text-3xl text-gray-600 mt-15 mb-12">
          All accepted papers will be published in one of the following indexed journals
        </p>


        <div className="grid  md:grid-cols-2 gap-8 max-w-5xl mx-auto ">

          <div className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 shadow-md hover:shadow-lg">

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
              <div className="bg-blue-800 text-white text-xs font-semibold px-3 py-1 rounded mb-3 w-fit">
                OPTION 1
              </div>
              <h3 className="text-white text-lg font-bold">
                SCOPUS Indexed Book Chapter
              </h3>
            </div>


            <div className="bg-white p-6">
              <p className="text-gray-500 italic text-lg">Awaiting approval.</p>
            </div>
          </div>


          <div className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg">

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6">
              <div className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded mb-3 w-fit">
                OPTION 2
              </div>
              <h3 className="text-gray-800 text-lg font-bold">
                NON SCOPUS Indexed Journals
              </h3>
            </div>


            <div className="bg-white p-6">
              <p className="text-gray-700 text-lg mb-2 leading-relaxed">
                International Journal of Innovations in Management, Science and Engineering
              </p>
              <p className="text-gray-500 text-lg mb-2">
                (Crossref, Google Scholar & Research Gate)
              </p>
              <a
                href="https://ijimse.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-lg hover:underline"
              >
                https://ijimse.co.in/
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Five Page */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 text-center">



          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Important Note
          </h2>


          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            The authors registered for the WCISE with paper publication may revise
            the paper even after the conference based on the reviewer/editor
            comments of the Journal. The WCISE committee has the sole authority
            for deciding and choosing the International journals for the
            publication of the full-length papers under the registered category.
            The authors cannot decide or choose the specific International journal
            for the publication.
          </p>
        </div>
      </div>
      {/* Six Page */}
      <div class="py-16 px-6 md:px-20 bg-white flex items-center flex-col">

        <h2 class="text-3xl md:text-3xl font-bold text-center text-gray-900 mb-20">
          Online–Virtual Representation
        </h2>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mt-10 mx-auto">


          <div className="w-full flex justify-center px-4 md:px-0 my-6">
            <img
              src={submission_img2}
              alt="Submission"
              className="w-full max-w-md md:max-w-2xl h-auto object-contain rounded-lg"
            />
          </div>


          <div class="text-gray-700 font-semibold text-lg text-justify md:text-base">
            <p>
              The conference will be conducted in hybrid mode and virtual presentation is available for the individuals using a suitable online conference platform. Virtual Presentation permits contributors to submit abstract/full length papers for refereeing and publication in the conference publications, exactly like a regular paper. Virtual authors whose abstracts/full length papers are accepted (and who have paid registration fees) should submit a power point presentation (with video and/or audio), mp4, or any other multimedia file of their work as due to the different time zone, if they are not available for presentation at the scheduled time then their video presentation will be run as per the conference schedule. Virtual presentation duration of each author will last between 8 to 10 minutes. A high speed internet connection is recommended for live virtual presentations.
            </p>
          </div>
        </div>
      </div>

      {/* Seven Page */}
      {/* <div className="min-h-screen flex items-center justify-center bg-white">

        <div className="bg-[#1E2A5E] text-white mb-8 rounded-lg shadow-lg  w-full max-w-9xl text-center">
          <h1 className="text-7xl font-bold mt-10 mb-10">Important Dates</h1>

          <div className="space-y-6 text-lg font-medium">
            <div>
              <p className="font-semibold">Last Date of Paper Submission:</p>
              <p>October 31, 2025</p>
            </div>

            <div>
              <p className="font-semibold">Paper Acceptance Notification:</p>
              <p>November 15, 2025</p>
            </div>

            <div>
              <p className="font-semibold">
                Last date for receiving CRC and Registration:
              </p>
              <p>November 30, 2025</p>
            </div>

            <div>
              <p className="font-semibold ">Conference Dates:</p>
              <p className="mb-10">December 28–27, 2025</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Eight Page */}
      <div className="flex flex-col items-center space-y-4 mb-4">


        <h2 className="text-xl font-semibold">Get In Touch</h2>
        <p className="text-gray-500 text-sm">
          For any query, feel free to contact us
        </p>

        <a
          href="mailto:wcise.convenor@gmail.com"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          wcise.convenor@gmail.com
        </a>
      </div>
    </div>


  )
}

export default Submissions