import { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        init={particlesInit}
        options={{
          background: { color: { value: "#000" } },
          particles: {
            number: { value: 120 },
            color: { value: "#ffcc00" },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      />

      <Navbar className="navbarCSS">
        <Navbar.Brand className="text-white navTitle">
          Expense Management System
        </Navbar.Brand>

        <Nav>
          {user && (
            <Button onClick={handleLogout} variant="primary">
              Logout
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;