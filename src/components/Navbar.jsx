import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 onClick={() => navigate("/home")}>TravelEase ✈️</h2>

      <button onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;