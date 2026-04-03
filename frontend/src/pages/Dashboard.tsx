import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ParticlesBg from "../components/ParticlesBg";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      <ParticlesBg />

      <div
        className="container dashboard-container"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h3 className="text-white">Expense Management System</h3>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Filters */}
        <div className="filter-box">
          {/* Frequency */}
          <div className="filter-item">
            <label className="text-white">Select Frequency</label>
            <select className="form-select">
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>

          {/* Type */}
          <div className="filter-item">
            <label className="text-white">Type</label>
            <select className="form-select">
              <option>All</option>
              <option>Expense</option>
              <option>Credit</option>
            </select>
          </div>

          {/* Icons */}
          <div className="filter-item">
            <div
              style={{
                border: "1px solid #aaa",
                padding: "8px 12px",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              📊 📋
            </div>
          </div>

          {/* Add New */}
          <div className="filter-item d-flex justify-content-end">
            <button className="btn btn-primary add-btn">Add New</button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="reset-btn">
          <button className="btn btn-primary">Reset Filter</button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="table table-dark table-striped text-center">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>2024-01-01</td>
                <td>Sample Expense</td>
                <td>500</td>
                <td>expense</td>
                <td>Food</td>
                <td style={{ cursor: "pointer", color: "red" }}>🗑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
