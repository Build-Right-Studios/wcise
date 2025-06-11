import React from 'react'
import Title from '../Title'
import about_us from '../../images/about_us.png'

function About() {
  return (
    <div>
        <Title title={"ABOUT THE CONFERENCE"}/>
        <div className='flex items-center justify-center flex-col pl-2 pr-2 lg:flex-row'>
            <img src={about_us} alt="" />
            <p className="text-justify mt-8 text-gray-800 text-md leading-relaxed pl-4 pr-4 lg:text-lg">The WCISE is an international conference where researchers and academicians will share their ideas, present research papers, participate in workshops, and other related activities. The conference provides international platform for students, scientists, professors, and industry professionals to interact about their innovations and outcomes in research fields of science and latest technologies around the world. There will be feature discussions by eminent personalities from academics and industries on contemporary advances in the field of science, materials, computer science, mechanical engineering, electrical and electronics engineering and technology. It is expected that more than 500 participants around the globe will share their knowledge by keynote lectures, and oral presentations. It is an excellent prospect for the emissaries from global universities and institutes to share their knowledge with world-class scientists.</p>
        </div>
    </div>
  )
}

export default About