import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("tourist");

  const handleLogin = () => {
    localStorage.setItem("role", role);
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "host") {
      navigate("/host");
    } else {
      navigate("/home"); 
    }
  };

  return (
    <>
      <style>{`
        /* --- ADVANCED ANIMATIONS --- */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes imageZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }

        /* --- LAYOUT --- */
        .login-layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: #ffffff;
          font-family: "Inter", system-ui, -apple-system, sans-serif;
        }

        /* --- LEFT VISUAL PANEL --- */
        .hero-panel {
          flex: 1.2;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 4rem;
        }

        .hero-image {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
          animation: imageZoom 20s alternate infinite ease-in-out;
          z-index: 1;
        }

        /* Cinematic Dark Gradient Overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 50%, transparent 100%);
          z-index: 2;
        }

        .hero-text {
          position: relative;
          z-index: 3;
          color: white;
          animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-text h1 {
          font-size: clamp(3rem, 4vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 1rem 0;
          letter-spacing: -1.5px;
        }

        .hero-text p {
          font-size: 1.25rem;
          color: #cbd5e1;
          max-width: 80%;
          margin: 0;
          font-weight: 400;
        }

        /* --- RIGHT FORM PANEL --- */
        .form-panel {
          width: 100%;
          max-width: 550px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 3rem 4rem;
          background: #ffffff;
          box-shadow: -20px 0 50px rgba(0,0,0,0.05);
          z-index: 10;
        }

        .brand-title {
          font-size: 2.8rem;
          font-weight: 900;
          margin: 0 0 0.5rem 0;
          letter-spacing: -1px;
          /* Next-Level Gradient Text */
          background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          margin: 0 0 3rem 0;
        }

        .input-group {
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Staggered form loading */
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        .custom-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .custom-input {
          width: 100%;
          padding: 1.1rem 1.2rem;
          border-radius: 16px;
          border: 2px solid #f1f5f9;
          background: #f8fafc;
          font-size: 1rem;
          color: #0f172a;
          outline: none;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .custom-input:focus {
          border-color: #0ea5e9;
          background: #ffffff;
          box-shadow: 0 10px 20px -10px rgba(14, 165, 233, 0.2);
          transform: translateY(-2px);
        }

        .submit-btn {
          width: 100%;
          padding: 1.2rem;
          margin-top: 1rem;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.4);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .submit-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px -5px rgba(2, 132, 199, 0.5);
        }

        /* --- MOBILE RESPONSIVENESS --- */
        @media (max-width: 1000px) {
          .hero-panel { display: none; } /* Hide image on small screens */
          .form-panel { max-width: 100%; align-items: center; padding: 2rem; }
          .form-container { width: 100%; max-width: 450px; }
        }
      `}</style>

      <div className="login-layout">
        
        {/* LEFT SIDE: Inspiring Travel Visual */}
        <div className="hero-panel">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h1>Discover the world's best homestays.</h1>
            <p>Join thousands of travelers and hosts creating unforgettable experiences.</p>
          </div>
        </div>

        {/* RIGHT SIDE: Clean Login Form */}
        <div className="form-panel">
          <div className="form-container">
            <div className="input-group delay-1" style={{ marginBottom: "2.5rem" }}>
              <h2 className="brand-title">TravelEase</h2>
              <p className="form-subtitle">Welcome back! Please enter your details.</p>
            </div>

            <div className="input-group delay-2">
              <label className="custom-label">Email Address</label>
              <input 
                className="custom-input"
                type="email" 
                placeholder="hello@travelease.com" 
              />
            </div>

            <div className="input-group delay-3">
              <label className="custom-label">Password</label>
              <input 
                className="custom-input"
                type="password" 
                placeholder="••••••••" 
              />
            </div>

            <div className="input-group delay-4">
              <label className="custom-label">Select Account Type</label>
              <select 
                className="custom-input"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={{ cursor: "pointer", appearance: "none" }}
              >
                <option value="tourist">🎒 Tourist (Explore places)</option>
                <option value="host">🏡 Host (Manage properties)</option>
                <option value="admin">🛡️ Admin (System control)</option>
              </select>
            </div>

            <div className="input-group delay-4" style={{ animationDelay: "0.5s" }}>
              <button className="submit-btn" onClick={handleLogin}>
                Sign In to Account
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;