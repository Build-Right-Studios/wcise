import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CallForPapers from './pages/CallForPapers'
import Committee from './pages/Committee'
import Submissions from './pages/Submissions'
import Registration from './pages/Registration'
import TechnicalWorkshop from './pages/TechnicalWorkshop'
import Keynote from './pages/Keynote'
import PreviousEvents from './pages/PreviousEvents'
import Awards from './pages/Awards'
import Awards2019 from './pages/Awards2019'
import Awards2022 from './pages/Awards2022'
import Awards2023 from './pages/Awards2023'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import KeynoteAdmin from './pages/KeynoteAdmin'


function App() {

  return (
    <>
      <div className='overflow-x-hidden'>
        <Navbar />
        <Routes>
          <Route path = "/" element= {<Home />}/>
          <Route path = "/call-for-papers" element= {<CallForPapers />}/>
          <Route path = "/committee" element= {<Committee />}/>
          <Route path = "/submissions" element= {<Submissions />}/>
          <Route path = "/registration" element= {<Registration />}/>
          <Route path = "/technical-workshop" element= {<TechnicalWorkshop />}/>
          <Route path = "/keynote" element= {<Keynote />}/>
          <Route path = "/previous-events" element= {<PreviousEvents />}/>
          <Route path = "/awards" element= {<Awards />}/>
          <Route path = "/awards-2019" element= {<Awards2019 />}/>
          <Route path = "/awards-2022" element= {<Awards2022 />}/>
          <Route path = "/awards-2023" element={<Awards2023 />}/>
          <Route path = "/login" element= {<Login />}/>
          <Route path = "/KeynoteAdmin" element= {<KeynoteAdmin/>}/>
          
       
          <Route path="*" element={<NotFound />} />
         
        </Routes>
      </div>
    </>
  )
}

export default App
