import { useEffect, useState } from "react";
import { getPlaces, deletePlace, getUserCount } from "../api/api";
import "../App.css";

function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const load = () => getPlaces().then(setPlaces);

  useEffect(() => {
    load();

    // ✅ fetch user count
    getUserCount()
      .then((count) => setUserCount(count))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await deletePlace(id);
    load();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* ✅ USER COUNT */}
      <div className="card">
        <h3>Total Users</h3>
        <p>{userCount}</p>
      </div>

      <h3>Manage Places</h3>

      {places.map((p) => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;