import React from 'react'
import Slider from '../components/Home Components/Slider'
import Title from '../components/Title'
import About from '../components/Home Components/About'
import ImportantNews from '../components/Home Components/ImportantNews'
import ImportantLink from '../components/Home Components/ImportantLink'
import Publisher from '../components/Home Components/Publisher'

function Home() {
  return (
    <div>
      <Slider />
      <About />
      <ImportantNews />
      <ImportantLink />
      <Publisher />
    </div>
  )
}

export default Home