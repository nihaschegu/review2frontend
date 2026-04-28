import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });

      console.log("Login response:", data); // ✅ debug

      // ✅ store token
      localStorage.setItem("token", data.token);

      // ✅ store ONLY user object
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ get role correctly
      const role = data.user?.role?.toLowerCase();

      localStorage.setItem("role", role);

      // ✅ redirect based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "host") {
        navigate("/host");
      } else {
        navigate("/home"); // tourist
      }

    } catch (err) {
      alert("Invalid credentials ❌");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p
        onClick={() => navigate("/signup")}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Create account
      </p>
    </div>
  );
}

export default Login;