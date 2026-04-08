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

      // ✅ store full user object (VERY IMPORTANT for booking)
      localStorage.setItem("user", JSON.stringify(data));

      // optional (you can keep this for routing)
      localStorage.setItem("role", data.role);

      // ✅ redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "host") {
        navigate("/host");
      } else {
        navigate("/home");
      }

    } catch (error) {
      alert("Invalid credentials ❌");
      console.error(error);
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

      <p onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "blue" }}>
        Create account
      </p>
    </div>
  );
}

export default Login;