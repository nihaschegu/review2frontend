import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "../App.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tourist"
  });

  const handleSignup = async () => {
    await registerUser(form);
    alert("User created");
    navigate("/");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

      <select onChange={e => setForm({...form, role: e.target.value})}>
        <option value="tourist">Tourist</option>
        <option value="host">Host</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;