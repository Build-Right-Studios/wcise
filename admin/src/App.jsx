import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

import Awards from './awards';
import PreviousEvents from './PreviousEvents';
import Committiee from './committiee';
import Authorcomponent from './components/tracks/login components/Authorcomponent';
import AnimatedSidebar from "./components/Navbar/AnimatedSidebar.jsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <AnimatedSidebar />
        <div className="flex-1">
          <Awards />
          <PreviousEvents />
          <Committiee />
          <Authorcomponent />
        </div>
      </div>
    </Router>
  );
}

export default App;
