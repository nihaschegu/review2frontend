import { useState } from "react";
import { addPlace } from "../api/api";
import "../App.css";

function HostDashboard() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    image: ""
  });

  const handleAdd = async () => {
    await addPlace(form);
    alert("Place added");
  };

  return (
    <div>
      <h2>Host Dashboard</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} />
      <input placeholder="Image URL" onChange={e => setForm({...form, image: e.target.value})} />

      <button onClick={handleAdd}>Add Place</button>
    </div>
  );
}

export default HostDashboard;