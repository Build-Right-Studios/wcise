import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Awards from './awards'
import PreviousEvents from './PreviousEvents'
import Committiee from './committiee';
import Authorcomponent from '../../frontend/src/components/tracks/login components/Authorcomponent';
function App() {

  return (
   <div>
    <Awards/>
    <PreviousEvents/>
    <Committiee/>
   <Authorcomponent/>
   </div>
  )
}

export default App
