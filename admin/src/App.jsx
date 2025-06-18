import AnimatedSidebar from "./components/Navbar/AnimatedSidebar.jsx";
import {Routes, Route} from 'react-router-dom';

function App() {

  return(

    <>
    <Routes>
        <Route path='/' element = { <AnimatedSidebar/>} />
    </Routes>
    </>
   
   
  
  );
}

export default App;
