import { useEffect, useState } from "react";
import { getPlaces, deletePlace, getUserCount } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  const load = () => getPlaces().then(setPlaces);

  useEffect(() => {
    const role = localStorage.getItem("role");

    // ✅ PROTECT ADMIN ROUTE
    if (role !== "admin") {
      alert("Access Denied ❌");
      navigate("/");
      return;
    }

    load();

    getUserCount()
      .then(setUserCount)
      .catch((err) => console.error("User count error:", err));

  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePlace(id);
      load();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* ✅ USER COUNT CARD */}
      <div className="card">
        <h3>Total Users</h3>
        <p>{userCount}</p>
      </div>

      <h3>Manage Places</h3>

      <div className="grid">
        {places.map((p) => (
          <div key={p.id} className="card">
            <h4>{p.name}</h4>
            <p>{p.location}</p>

            <button onClick={() => handleDelete(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;