import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Awards from './awards'
import PreviousEvents from './PreviousEvents'
import Committiee from './committiee';

function App() {

  return (
   <div>
    <Awards/>
    <PreviousEvents/>
    <Committiee/>
    Admin
   </div>
  )
}

export default App
