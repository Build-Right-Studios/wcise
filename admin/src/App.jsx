import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Awards from './awards';
import PreviousEvents from './PreviousEvents';
import Committiee from './committiee';
import AnimatedSidebar from "./components/Navbar/AnimatedSidebar.jsx";

function App() {
  return (
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
}

export default App;
