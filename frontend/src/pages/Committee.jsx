import React from 'react';
import ArrowCard from '../components/Arrowcard/Arrowcard';
import ReverseArrow from '../components/Arrowcard/ReverseArrow';

function Committee() {
  const generalchairs = [
    "Prof. Chai Ching Tan, Rajamangala University of Technology, Rattanakosin, Thailand",
    "Prof. Nitin Chanderwal, University of Cincinnati, USA"
  ]

  const conference = [
    "Prof. Sandip Vijay, Dev Bhoomi Uttarakhand University, Dehradun, India",
    "Dr. Sujin Butdisuwan, Metharath University, Pathum Thani Province, Thailand",
    "Prof. Yannakorn Toprayoon, Rajapark Institute, Bangkok, Thailand"
  ]

  const confer = [
    "Dr. Sujanya Sombatteera, Metharath University, Pathum Thani Province, Thailand",
    "Dr. Kumron Sirathanakul, Rajmangala University of Technology, Thanyaburi, Thailand",
    "Dr. Adesh Kumar, University of Petroleum and Energy Studies, Dehradun, India",
    "Prof. Ritika Mehra, Dev Bhoomi Uttarakhand University, Dehardun, India"
  ]

  const Track = [
    "Dr. Chanyanan Somthawinpongsai, Shinawatra University, Pathum Thani Province, Thailand"
  ]

  const os = [
    "Dr. Thanyanant Chansongpol, Rajapark Institute, Bangkok, Thailand",
    "Mr.Thitipan Somtawin, Pathumwan Institute of Technology, Bangkok, Thailand",
    "Ms. Ketsaraporn Thaisaentha, Rajapark Institute, Bangkok, Thailand"
  ]

  const publicity = [
    "Dr. Worakamol Wisetsri, King Mongkut's University of Technology, Thailand",
    "Prof. Sanjeev Kumar Shah, Uttaranchal University, Dehradun, India",
    "Dr. Gaurav Verma, Jaypee Institute of Information Technology, Noida, India"
  ]

  const publication = [
    "Dr. Worakamol Wisetsri, King Mongkut's University of Technology, Thailand",
    "Prof. Sanjeev Kumar Shah, Uttaranchal University, Dehradun, India",
    "Dr. Gaurav Verma, Jaypee Institute of Information Technology, Noida, India"
  ]

  const convenor = [
    "Dr. Pensri Bangbon, Metharath University, Pathum Thani Province, Thailand",
    "Dr. Deval Verma, Bennett University, Times Group, Greater Noida, India"
  ]

  const tour = [
    "Mr. Ashish Sharma, Embedded Technologies, Noida, India"
  ]


  return (
    <div className='s m:p-6 p-auto  text-[#1d3b58]'>
      <h1 className="sm:text-4xl text-2xl font-bold text-center mb-10">STEERING COMMITTEE</h1>

      <ArrowCard
        title="General Chairs"
        data={generalchairs} />

      <ReverseArrow
        title="Conference Chairs"
        data={conference} />

      <ArrowCard
        title="Conference Co-chairs"
        data={confer} />

      <ReverseArrow
        title="Track Chairs"
        data={Track} />

      <ArrowCard
        title="Organizing Secretary"
        data={os} />

      <ReverseArrow
        title="Publicity Chair"
        data={publicity} />

      <ArrowCard
        title="Publication Chair"
        data={publication} />

      <ReverseArrow
        title="Convenor"
        data={convenor} />

      <ArrowCard
        title="Conference Tour Manager"
        data={tour} />


      <div className='items-center gap-6'>
        <h1 className=' bg-[#1d3b58] text-white m-2 p-4 sm:p-6 sm:m-4 rounded-2xl underline text-center text-2xl shadow-md shadow-[#1d3b58] sm:text-4xl font-bold'>COMMITTEES</h1>

        <div className='bg-[#1d3b58] text-white m-4 sm:m-6 p-6  rounded-2xl shadow-md shadow-[#1d3b58]'>
          <p className='text-xl sm:text-3xl font-bold text-center pb-6'>International Advisory Committee</p>
          <p>Prof. Nitin Chanderwal, University of Cincinnati, USA</p>
          <p>Prof. Muthmainnah, S., Universitas Al Asyariah Mandar, Indonesia</p>
          <p>Prof. Mohsin M. Jamali, University of Toledo, USA</p>
          <p>Prof. George Edwards, University of Denver, USA</p>
          <p>Prof. Vijay Arora, Wilkes University, USA</p>
          <p>Prof. Harpreet Singh, Wayne State University, USA</p>
          <p>Prof. Shambhu J. Upadhyaya, The State University of New York, USA</p>
          <p>Prof. Shamimul Qamar, King Khalid University, Abha, KSA</p>
          <p>Prof. D.M. Akbar Hussain, Aalborg University, Denmark*</p>
          <p>Prof. Maaruf Ali, King's College London, United Kingdom</p>
          <p>Prof. Sheng-Lung Peng, National Dong Hwa University, Hualien, Taiwan</p>
          <p>Prof. G. S. Tomar, MIR Labs, Gwalior , India*</p>
          <p>Prof S. C. Sharma, IIT Roorkee, India</p>
          <p>Prof. Brajesh Kumar Kaushik, Indian Institute of Technology, Roorkee, India</p>
          <p>Prof. B.S.Chowdhry, MUET/Lead Person Erasmus Mundus projects MUET, PK</p>
          <p>Prof. Muhammad Aamir, Sir Syed University of Engineering Technology, PK</p>
          <p>Dr. Bhagwan Das Tun Hussein Onn University of Malayisa</p>
          <p>Dr. Vikas Singh, Daihachi, Yokohama, Kanagawa, Japan.</p>
        </div>

        <div className='bg-[#1d3b58] text-white m-4 sm:m-6 p-6  rounded-2xl shadow-md shadow-[#1d3b58]'>
          <p className=' text-xl sm:text-3xl font-bold text-center pb-6'>Technical Program Committee</p>
          <p>Dr. P. Thakur, Graphic Era University, Dehradun, India</p>
          <p>Dr. Geetanjali Manocha, Graphic Era University, Dehradun, India</p>
          <p>Dr. B. D. Patel, COER, Roorkee, India</p>
          <p>Dr. Ashish Bagwari, WIT, UTU, Dehradun, India</p>
          <p>Dr. Vipul Sharma, Gurukul Kangri University, Haridwar, India</p>
          <p>Dr. Tanuj Garg, Gurukul Kangri University, Haridwar, India</p>
          <p>Dr. Udit Kumar, Lead Member, Mentor Graphics, India</p>
          <p>Dr. Vishal Jain, BVICAM, New Delhi, India</p>
          <p>Dr. R. Gowri, UPES, Dehradun, India</p>
          <p>Dr. Deepak Gupta, KEC, Ghaziabad, India</p>
          <p>Dr. Manish Kumar, PSIT, Kanpur, India</p>
          <p>Dr. Gaurav Verma, JIIT, Noida, India</p>
          <p>Dr. Rahul Kaushik, JIIT, Noida, India</p>
          <p>Dr. Dharmendra Jhariya, JIIT, Noida, India</p>
          <p>Dr. Deepak Gupta, KEC, Ghaziabad, India</p>
          <p>Dr. Mukul Kumar Gupta, UPES, Dehradun, India</p>
          <p>Dr. Adesh Kumar, UPES, Dehradun, India</p>
          <p>Dr. Kumar Prasannajit Pradhan, IIITDM Kancheepuram, India</p>
          <p>Dr. Sonal Singhal, SNU, Greater Noida, India</p>
          <p>Dr. Gopal Das Singhal, SNU, Greater Noida, India</p>
          <p>Dr. Prashant Mani, SRM University, NCR Campus, Ghaziabad, India</p>
          <p>Dr. Arpit Jain, Teerthankar Mahaveer University, Moradabad, India</p>
          <p>Dr. Ambuj Aggarwal, Teerthankar Mahaveer University, Moradabad, India</p>
          <p>Dr. Manmohan, Amity University, Noida, India</p>
          <p>Dr. Anil Kumar Gautam, Gautam Buddha University, Greater Noida, India</p>
          <p>Dr. Gagan Singh, DIT University, Dehradun, India</p>
          <p>Dr. Sonika Singh, DIT University, Dehradun, India</p>
          <p>Dr. Brajlata Chouhan, DIT University, Dehradun, India</p>
          <p>Dr. Rama Susheek, DIT University, Dehradun, India</p>
          <p>Dr. Ritika, DIT University, Dehradun, India</p>
          <p>Dr. Vishal Bharti, DIT University, Dehradun, India</p>
          <p>Dr. Manoj Kumar, DIT University, Dehradun, India</p>
          <p>Dr. Anil Patil, DIT University, Dehradun, India</p>
          <p>Dr. Y. K. Tyagi, DIT University, Dehradun, India</p>
          <p>Dr. Praveen Kumar, DIT University, Dehradun, India</p>
          <p>Dr. M. C. Bhandari, DIT University, Dehradun, India</p>
        </div>
      </div>

    </div>


  );
}

export default Committee;