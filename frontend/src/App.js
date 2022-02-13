import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import UserSignupPage from "./pages/UserSignupPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import Logo from "./components/Logo";
import DoctorSignupPage from "./pages/DoctorSignupPage";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";
import GetAppointmentPage from "./pages/GetAppointmentPage";
import ProfilePage from "./pages/ProfilePage";
import { useSelector } from "react-redux";

const App = () => {

  const {  username } = useSelector((store) => ({
    username:store.username,
}));

  return (
    <div className="App">
      <Router>
        <Logo />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about-us' element={<AboutUsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/signup' element={<UserSignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/get-appointment' element={<GetAppointmentPage />} />
          <Route path='/schedule-appointment' element={<ScheduleAppointmentPage />} />
          <Route path='/signup-doctor' element={<DoctorSignupPage />} />
          <Route path={`/${username}`} element={<ProfilePage />} />
          <Route path='*' element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
