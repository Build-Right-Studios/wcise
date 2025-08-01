import React from 'react'
import submissions from '../images/submission.png'
import submissions1 from '../images/submissions1.png'
import submissions2 from '../images/submission2.png'

function Submissions() {
  return (
    <div>
      <h1 className='mt-6 text-4xl px-6 font-bold mb-8 text-center text-[#1d3b58]'>Paper Submission & Publication</h1>
      <p className=' mb-2 mx-5 text-justify text-lg text-[#4267b2]'>Research papers are invited for submission in WCISE’23. All the full length accepted papers of WCISE will be published in the peer reviewed SCOPUS/Non-SCOPUS Journals and SCOPUS Indexed book chapater as per their registration category.</p>

      <div>
        <img className="object-cover w-full mt-4 h-20 lg:h-40 " src={submissions} alt="Submission" />
      </div>

      <div className='mt-4 text-center font-bold'>
        <p className='mb-4 text-lg text-[#8f5d46]'>
          Authors are invited to submit paper through the Google form link</p>
        <a className='mb-4 text-xl text-[#bc1823] underline' href="#">Click here to submit your paper</a><br /><br />
        <a className='mt-12 text-xl text-[#122e76] underline' href="#">Click here to download the WCISE Template</a>
      </div>
      <div className='mt-4 text-center relative'>
        <img className="absolute w-full lg:h-50" src={submissions1} alt="submissions" />

        <h5 className='mt-26 text-xl font-bold text-[#1d3b58] absolute lg:left-110'>Submitted papers must comply with plagiarism policy and procedures</h5>
      </div>
      <p className='text-justify mt-60 mb-5 mx-5 text-[#1d3b58]'>The publication process for the full length papers registered under the category of SCOPUS Indexed International Journals will take maximum of six months and for SCI Indexed Journals will take nine months after the conference. <br /> <br />
        The publication process for the full length papers registered under NON SCOPUS category/DOI Indexed/UGC approved International Journals will take 3-6 month after the conference. <br /> <br />
        All submissions must be plagiarism free and upto 10 % acceptable limit.</p>


      <hr className=" border-b-3 mt-7 text-[#1d3b58] mx-13" /><br />
      <p className='ml-2 text-xl font-bold text-[#1d3b58]'>Note For Authors:</p>
      <p className='text-justify mt-2 mb-5 mx-5 text-[#1d3b58]'>The corresponding authors of accepted papers are required to please fill, complete, sign and send the copyright form along with the Camera Ready as per Conference Template. Failure to comply, the paper will not be considered for the publication. All submissions must be plagiarism free and upto 10 % acceptable limit. The tentative journals (including SCOPUS/SCI indexed) associated/to be associated for publication consideration for the registered and accepted full length paper of WCISE are listed below:</p>

      <div className='px-4'>
        <h3 className='mt-6 text-center text-[#1d3b58] text-2xl font-bold mb-4'>ALL ACCEPTED PAPERS WILL BE PUBLISHED IN ONE OF THE FOLLOWING INDEX JOURNALS:</h3>
        <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
          <h3 className='text-lg font-bold'>OPTION-1 SCOPUS Indexed Book Chapter</h3>
          <div>Awaiting approval, Scrivener Publishing, Wiley (Indexed in SCOPUS).</div>
        </div>

        <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
          <h3 className='text-lg font-bold'>OPTION-2 SCOPUS Indexed Journal</h3>
          <div>Updated Soon</div>
        </div>

        <div className='border-2 border-[#1d3b58] p-4 rounded shadow-2xl mb-4'>
          <h3 className='text-lg font-bold'>OPTION-3 NON SCOPUS Indexed JOURNALS</h3>
          <div>International Journal of Innovations in Management, Science and Engineering (Crossref, Google Scholar & Research Gate).
            https://ijimse.co.in/
          </div>
        </div>
      </div>

      <div className=" mt-10 w-full px-5">
        <div className="bg-[#122e76] text-white p-4 rounded-lg shadow-lg">
          <h4 className="text-2xl font-bold mb-3 text-center">Important Note : </h4>
          <p className="text-lg text-justify">
            The authors registered for the WCISE with paper publication may revise the paper even after the conference based on the reviewer/editor comments of the Journal. The WCISE committee has the sole authority for deciding and choosing the International journals for the publication of the full length papers under the registered category. The authors cannot decide/choose the specific International journal for the publication.
          </p>
        </div>
      </div>
      <hr className=" border-b-5 mt-10 text-[#1d3b58] ml-40 lg:ml-60" /><br />


      <div>
        <h4 className='ml-2 lg:ml-4 mb-2 lg:mt-6 text-xl lg:text-2xl font-bold text-[#1d3b58]'>ONLINE-VIRTUAL PRESENTATION</h4>
        <p className='text-justify mt-2 lg:mt-4 mb-5 lg:mb-10 mx-5 lg:mx-10 text-[#1d3b58]'>The conference will be conducted in hybrid mode and virtual presentation is available for the individuals using a suitable online conference platform. Virtual Presentation permits contributors to submit abstract/full length papers for refereeing and publication in the conference publications, exactly like a regular paper. Virtual authors whose abstracts/full length papers are accepted (and who have paid registration fees) should submit a power point presentation (with video and/or audio), mp4, or any other multimedia file of their work as due to the different time zone, if they are not available for presentation at the scheduled time then their video presentation will be run as per the conference schedule. Virtual presentation duration of each author will last between 8 to 10 minutes. A high speed internet connection is recommended for live virtual presentations.
        </p></div>
      <div className='mt-4 text-center relative'>
        <img className="absolute w-full h-80 lg:h-80" src={submissions2} alt="submissions" />
        <h4 className='mt-4 mx-4 text-xl lg:text-3xl font-bold absolute lg:left-110 text-white ml-25 lg:ml-55'>Important Dates</h4>
        <br />
        <div className='text-white absolute lg:left-110 mt-12 text-center'>
          <h5 className='text-lg lg:mt-5'>Last Date of Paper Submission :</h5>
          <p className='mb-2'>October 31, 2023</p>
          <h5>Paper Acceptance Notification :</h5>
          <p className='mb-2'>November 15, 2023</p>
          <h5 className='ml-6 lg:ml-45 lg:mr-45'>Last date for receiving CRC and Registration:</h5>
          <p className='mb-2'>November 30, 2023</p>
          <h5>Conference Dates:</h5>
          <p>December 29-30, 2023</p>
        </div>
        <div>
          <div className='text-[#1d3b58] lg:left-100 text-center mt-80 lg:text-lg'>
            <p className='md:tracking-wide'>For any query, feel free to Contact at <span className='font-bold '>Email : wcise.convenor@gmail.com</span>
            </p>
          </div>
          <p className='text-[#1d3b58] lg:left-110 text-center mt-2 lg:text-lg'>Dr. Pensri Bangbon, Shinawatra University, Pathum Thani Province, Thailand
            Dr. Deval Verma, Bennett University, Greater Noida, India</p>
        </div>


      </div>
    </div>

  )
}

export default Submissions