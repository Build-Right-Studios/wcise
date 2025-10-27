import React, { useState } from 'react';
import Card from '../components/card/Card';
import MyModal from '../components/Modal';
import director from '../images/director.jpg'
import prof_1 from "../images/prof_1.jpg"
import ap from "../images/ap.jpg"
import avp from "../images/avp.jpeg"
import prof_2 from "../images/prof_2.jpg"
import prof_3 from "../images/prof_3.png"
import ap_2 from "../images/ap_2.jpg"

function Keynote() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ imageurl: null, title: '', description: '' });

  const CloseModal = () => setShowModal(false);

  const openModalWithContent = (imageurl, title, description) => {
    setModalContent({ imageurl, title, description });
    setShowModal(true);
  };

  return (
    <div className='p-6 text-[#1d3b58]'>
      <p className='text-2xl sm:text-4xl text-center font-bold mb-8'>KEYNOTE SPEAKERS</p>

      <div className='flex flex-wrap justify-center items-stretch gap-8'>

        <div className='relative border-4 shadow-lg border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={director}
            heading="Prof. Yannakorn Toprayoon"
            subhead="Director"
            para="Management, Rajpark Institute, Thailand"
          />
          <button
            onClick={() => openModalWithContent(
              director,
              'Prof. Yannakorn Toprayoon',
              'Dr. Yannakorn Toprayoon, who is a recipient of the most Active Researcher Award, has published and presented 812 research papers in various national as well as international journals, conferences, guided 50 Ph.D scholars and 68 M. Tech students, and authored 50 books in various allied areas. He has delivered several keynote addresses and invited lectures at both national and international conferences. He has also delivered 42 video lectures on YouTube with maximum of 40,000 hits!'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={prof_1}
            heading="Prof. Shamimul Qamar"
            subhead="Professor"
            para="King Khalid University, Abha Kingdom of Saudi Arabia"
          />
          <button
            onClick={() => openModalWithContent(
              prof_1,
              'Prof. Shamimul Qamar',
              'Dr. S. Qamar, has been recognized as an eminent scholar in the field of Electronics & Computer Engg.. He has done his B.Tech from MMMEC Gorakhpur, M.Tech from AMU, Aligarh and earned his Ph.D. degree from IIT Roorkee with highly honorable grade. Prof. Qamar has a wide teaching experience in various Engineering colleges. He has research interests in Communication & Computer network, Computer Networks, Multimedia applications, Internet applications, Satellite network, DSP, Image Processing. He has published several research papers in reputed national/international Journals and conference. He served as Consultant in Jackson state university, USA. He is a reviewer of IJCSIS, USA. He has written some text books and chapters in the field of Electronics & Computer Engineering. He is also a technical programme committee member in international mobility conference, Singapore. He is a life time member of international association of Engineers and a life member of Indian Society of technical educational. His technical depth and interest resulted in setting up a research lab according to latest technical innovations. Along with this, he has actively participated in various technical courses workshops, seminar etc. at the IITS.'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={ap}
            heading="Prof. Nitin Chanderwal"
            subhead="Associate Professor"
            para="University of Cincinnati, USA"
          />
          <button
            onClick={() => openModalWithContent(
              ap,
              'Prof. Nitin Chanderwal',
              'He is currently Associate Professor of Information Systems at IIM Shillong, Meghalaya, INDIA. In the past he worked as Professor Educator in the Department of EECS at University of Cincinnati, OH, and as First Tier Bank Professor in the PKI at University of Nebraska at Omaha, NE, USA. He was born on October 06, 1978, in New Delhi, INDIA. In July 2001, he received the B.Engg. in Computer Science & Engineering [Hons.] and M.Engg. in Software Engineering from Thapar Institute of Engineering and Technology, Patiala, Punjab, INDIA in March 2003. In 2008, he received his Ph.D. in Computer Science & Engineering from JUIT, INDIA. He has completed his Ph.D. course work from University of Florida, Gainesville, FL, USA. He is a IBM certified engineer. He is a Life Member of IAENG, Senior Member of IEEE and IACSIT and Member of SIAM and ACIS and has 170 Research Papers in peer reviewed International Journals & Transactions, Book Chapters, Symposium, Conferences and Position. His research interest includes Social Networks especially Computer Mediated Communications & Flaming, Interconnection Networks & Architecture, Fault-tolerance & Reliability, Networks-on-Chip, Systems-on-Chip, and Networks-in Packages, Application of Stable Matching Problems, Stochastic Communication and Sensor Networks. Currently he is working on Parallel Simulation tools, BigSim using Charm++, NS-2 using TCL. He is Associate Editor of the International Journal of Parallel, Emergent and Distributed Systems, Taylor and Francis, UK in addition to this, he is referee for the Journal of Parallel and Distributed Computing; Computer Communications; Computers and Electrical Engineering; Mathematical and Computer Modelling-Elsevier Sciences., The Journal of Supercomputing, Springer and International Journal of System Science, Taylor & Francis..'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={avp}
            heading="Laxmi Kant Sahoo"
            subhead="Assistant Vice President"
            para="Mahindra Group, India"
          />
          <button
            onClick={() => openModalWithContent(
              avp,
              'Laxmi Kant Sahoo',
              'Mr Laxmi Kant Sahoo is currently working as Program Manager at Mercedes Benz Research & Development India. He got his B.Tech in Electronics and Instrumentation from Utkal University, Odisha and M.tech. from IIT Kharagpur in Visual information & embedded system. Mr Sahoo has 14 years of experience, which span into research, industry and academics. He has research interest in image processing, computer vision, machine learning, deep learning, signal processing and embedded system. He has published several research papers in reputed national/international Journals and conferences. He has filed 2 patents on automotive vehicular technology. He has reviewed more than 50 IEEE papers in signal, image and embedded system domain. Mr Sahoo has extensively worked in automotive industry from last 6-7 years in realizing Level 3 autonomous cars and self-driving cars. Majority of his contributions are in Sensor fusion technology, Object detection and tracking, lane detection, pedestrian and cyclist detection etc. He has actively participated in many national and international symposiums in Europe and Asia ΓÇô pacific.'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={prof_2}
            heading="Dr. Chai Ching Tan"
            subhead="Professor"
            para="Rajamangala University of Technology, Rattanakosin, Thailand"
          />
          <button
            onClick={() => openModalWithContent(
              prof_2,
              'Dr. Chai Ching Tan',
              'Dr. Chai Ching Tan is professor in School of Management, Mae Fah Luang University OD Specialist, NIDA University. Course delivered ΓÇô strategic performance management, research epistemology. Publication: NIDA HROD Journal 1/2553. 2010. Vice President, Strategic planning and organization development, factory operations, quality management systems (QMR), engineering, IT. Seafresh Industry Public Company Limited, Thailand. 2002-2010. Roles: Responsible for companyΓÇÖs strategies and operations performances, including factory production and operations transformation / re-engineering; project supervisions of ORACLE ERP/Balanced Scorecard'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={prof_3}
            heading="A. Pushparaghavan"
            subhead="Professor"
            para="Bahir Dar University, Bahir Dar, Ethiopia" />
          <button
            onClick={() => openModalWithContent(
              prof_3,
              'A. Pushparaghavan',
              'The research and academic contributions are made last three decades for the betterment of Science, Engineering and Technology students / scholars / teachers from Lecturer to professor in Various institutions and Universities located in the rural and urban level both in National / International level. All the contributions are made with technical team effort to meet out the Indian national standards of AICTE ΓÇô NBA, NAAC -UGC. Especially, more than last six years, contributed International Universities and fullfill the requirements / facilities of Indian ΓÇô Ethiopian universities research and technological developments, and also its my futuristic vision of all over Asia-Africa technology support.'
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

        <div className='relative border-4 border-[#1d3b58] p-6 text-center rounded-2xl h-[400px] w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 flex flex-col justify-between items-center'>
          <Card
            imageurl={ap_2}
            heading="DR. WORAKAMOL WISETSRI"
            subhead="ASSOCIATE PROFESSOR"
            para="King Mongkut's University of Technology North Bangkok" />
          <button
            onClick={() => openModalWithContent(
              ap_2,
              'DR. WORAKAMOL WISETSRI',
              "Organized Lecturer skilled in classroom management and curriculum presentation. Strong history of increasing student engagement and fostering learning outcomes demonstrated over 7 years of experience. Diligent Lecturer eager to fulfill a Human Resource Management role in which integrity and intellectual curiosity are highly valued. Articulate Educator eager to apply 10 years of experience in academic roles to bring value to a dynamic faculty. Well-versed in Human Resource Management and Human Resource Management with demonstrated success in curriculum management. Structured academic professional demonstrating proven success in fostering student learning outcome through creative and innovative curriculum delivery methods. Adept in driving thought-provoking class debates to promote student engagement and learning. Aiming to secure an opportunity to apply years of instruction experience. Charismatic Lecturer offering a proven history of faculty collaboration and commitment to research, illustrated over 10 years in academic roles. Eager to fulfill an opportunity within the king mongkut's university of technology north bangkok Personable and energetic Receptionist committed to delivering excellence in all facets of customer service and administrative support. Offers honed competencies in data-entry, database management, and scheduling."
            )}
            className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1d3b58] text-white rounded-md p-2 hover:bg-[#152e46] transition duration-300 w-3/4'
          >
            Read More
          </button>
        </div>

      </div>

      {showModal && (
        <MyModal
          CloseModal={CloseModal}
          imageurl={modalContent.imageurl}
          title={modalContent.title}
          description={modalContent.description}
        />
      )}
    </div>
  );
}

export default Keynote;
