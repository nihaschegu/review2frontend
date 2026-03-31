import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import TouristHome from "./pages/TouristHome";
import HostDashboard from "./pages/HostDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Details from "./pages/Details";

// 💡 Pro-tip: Create a smaller component inside to use the 'useLocation' hook
function AppContent() {
  const location = useLocation();
  
  // Define which paths should NOT have the top Navbar
  const hideNavbarRoutes = ["/", "/admin"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar will only render if we are NOT on Login or Admin pages */}
      {showNavbar && <Navbar />} 
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TouristHome />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* 👈 FIXED: Moved the Details route inside the Routes block */}
        <Route path="/details" element={<Details />} /> 
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* We wrap AppContent in BrowserRouter so it can access location data */}
      <AppContent />
    </BrowserRouter>
  );
}

export default App;