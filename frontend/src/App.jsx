import './App.css';

import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CallForPapers from './pages/CallForPapers';
import Committee from './pages/Committee';
import Submissions from './pages/Submissions';
import Registration from './pages/Registration';
import TechnicalWorkshop from './pages/TechnicalWorkshop';
import Keynote from './pages/Keynote';
import PreviousEvents from './pages/PreviousEvents';
import Awards from './pages/Awards';
import Awards2019 from './pages/Awards2019';
import Awards2022 from './pages/Awards2022';
import Awards2023 from './pages/Awards2023';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import KeynoteAdmin from './pages/KeynoteAdmin';

// ✅ Tracks/Login Components
import Dashboard from './components/tracks/login components/Dashboard';
import Authorcomponent from './components/tracks/login components/Authorcomponent';
import PaperDetailsCard from './components/tracks/PaperDetailsCard';
import EditorSignup from './components/tracks/login components/EditorsSignup';
import EditorsViewMore from './components/tracks/login components/EditorsViewMore';
import ReviewerDashboard from './components/tracks/login components/ReviewerDashboard';
import ReviewerReviewForm from './components/tracks/ReviewerReviewForm';
import PaperDetailsPage from './components/tracks/login components/PaperDetailsPage';

function App() {
  
  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/call-for-papers" element={<CallForPapers />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/technical-workshop" element={<TechnicalWorkshop />} />
          <Route path="/keynote" element={<Keynote />} />
          <Route path="/previous-events" element={<PreviousEvents />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/awards-2019" element={<Awards2019 />} />
          <Route path="/awards-2022" element={<Awards2022 />} />
          <Route path="/awards-2023" element={<Awards2023 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/keynote-admin" element={<KeynoteAdmin />} />

          {/* ✅ Tracks and Admin/Dashboard routes */}
          <Route path="/author/dashboard" element={<Dashboard />} />
          <Route path="/author/new-paper" element={<Authorcomponent />} />
          <Route path="/author/paper-details" element={<PaperDetailsCard />} />
          <Route path="/paper-details/:id" element={<PaperDetailsPage />} />

          {/* /author/:id */}
          <Route path="/editor/dashboard" element={<EditorSignup />} />
          <Route path="/editor/view-more/:paperId" element={<EditorsViewMore />} />
          {/* /editor/:id */}
         <Route path="/reviewer/dashboard" element={<ReviewerDashboard />} />
         <Route path="/reviewer/dashboard/:paperId" element={<ReviewerDashboard />} />
          
          {/* /reviewer/:id */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;