// libraries
import { Routes, Route } from "react-router-dom";

// features
import Banner from './features/banner/index.jsx';
import Calendar from "./features/calendar/index.jsx";
import Navbar from "./features/navbar/index.jsx";
import Dashboard from './pages/Dashboard.jsx';

// pages
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

// styles
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/create-venue" element={<CreateVenue />} />
      </Routes>
    </div>
  );
}
