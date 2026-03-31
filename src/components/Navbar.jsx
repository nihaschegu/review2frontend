import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  if (location.pathname === "/") return null;

  return (
    <nav className="navbar" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.8rem 5%",
      height: "80px",
      transition: "var(--transition-theme)"
    }}>
      {/* BRAND LOGO */}
      <div 
        onClick={() => navigate("/home")} 
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
      >
        <div style={{
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          width: "45px",
          height: "45px",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          boxShadow: "var(--shadow-md)",
          transition: "var(--transition-bounce)"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "rotate(-10deg) scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "rotate(0) scale(1)"}
        >
          ✈️
        </div>
        <h2 style={{ 
          fontSize: "1.6rem", 
          fontWeight: "900", 
          background: "linear-gradient(to right, var(--primary), var(--primary-dark))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          TravelEase
        </h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        
        {/* FABULOUS THEME TOGGLE */}
        <div 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            width: "64px",
            height: "32px",
            backgroundColor: isDarkMode ? "#1e293b" : "#e2e8f0",
            borderRadius: "32px",
            position: "relative",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            border: "1px solid var(--border-subtle)"
          }}
        >
          <div style={{
            width: "24px",
            height: "24px",
            backgroundColor: isDarkMode ? "#38bdf8" : "#f59e0b",
            borderRadius: "50%",
            position: "absolute",
            top: "3px",
            left: isDarkMode ? "35px" : "4px",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            boxShadow: isDarkMode ? "0 0 15px #38bdf8" : "0 0 15px #f59e0b"
          }}>
            {isDarkMode ? "🌙" : "☀️"}
          </div>
        </div>

        {/* PRO LOGOUT BUTTON */}
        <button 
          onClick={handleLogout}
          style={{
            background: "rgba(220, 38, 38, 0.1)",
            color: "#dc2626",
            border: "1px solid rgba(220, 38, 38, 0.2)",
            padding: "0.7rem 1.4rem",
            borderRadius: "14px",
            fontWeight: "800",
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.3s var(--transition-bounce)"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#dc2626";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(220, 38, 38, 0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(220, 38, 38, 0.1)";
            e.currentTarget.style.color = "#dc2626";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Logout 🚪
        </button>
      </div>
    </nav>
  );
}

export default Navbar;