import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Awards from './awards';
import PreviousEvents from './PreviousEvents';
import Committiee from './committiee';
<<<<<<< HEAD
import Authorcomponent from '../../frontend/src/components/tracks/login components/Authorcomponent';
=======
import AnimatedSidebar from "./components/Navbar/AnimatedSidebar.jsx";

>>>>>>> 71fc9e5374ab2a201365ff0aea7bce1ae988a7c7
function App() {
  return (
<<<<<<< HEAD
   <div>
    <Awards/>
    <PreviousEvents/>
    <Committiee/>
   <Authorcomponent/>
   </div>
  )
=======
    <div className="flex">
      <AnimatedSidebar />
      <div className="flex-1">
        <Awards />
        <PreviousEvents />
        <Committiee />
        Admin
      </div>
    </div>
  );
>>>>>>> 71fc9e5374ab2a201365ff0aea7bce1ae988a7c7
}

export default App;
