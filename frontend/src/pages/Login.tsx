import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg";
import "./auth.css";
const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (values.email && values.password) {
    localStorage.setItem("user", JSON.stringify(values));
    navigate("/dashboard"); // 🔥 redirect
  } else {
    alert("Please fill all fields ❌");
  }
};

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <ParticlesBg />

      <div
        className="mt-5 container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2 className="text-white text-center">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <label className="text-white">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-3">
                <label className="text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center mt-4">
                <p className="text-white">Forgot Password?</p>

                <button type="submit" className="btn btn-primary mt-2">Login</button>

                <p className="mt-3 text-white">
                  Don't have an account? Register
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
