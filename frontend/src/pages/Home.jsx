import React from 'react'
import Slider from '../components/Home Components/Slider'
import Title from '../components/Title'
import About from '../components/Home Components/About'
import ImportantNews from '../components/Home Components/ImportantNews'
import ImportantLink from '../components/Home Components/ImportantLink'
import Publisher from '../components/Home Components/Publisher'
import GetInTouch from '../components/Home Components/GetInTouch'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Slider />
      <About />
      <ImportantNews />
      <ImportantLink />
      <Publisher />
      <GetInTouch />
      <Footer />
    </div>
  )
}

export default Home