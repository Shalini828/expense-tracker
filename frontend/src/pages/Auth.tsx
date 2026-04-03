import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg";
import "./auth.css";
const Auth = () => {
  const navigate = useNavigate(); // ✅ INSIDE component

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <ParticlesBg />

      <div className="auth-box">
        <h1 className="title">Expense Tracker</h1>
        <p className="subtitle">Create your account</p>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <span onClick={() => setShowPassword(!showPassword)}>
            👁
          </span>
        </div>

        <button>Sign Up</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Auth;