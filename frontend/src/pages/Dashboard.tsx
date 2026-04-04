import Header from "../components/Header";
import { Container, Form, Button, Modal } from "react-bootstrap";
import "./Dashboard.css";
import { useState } from "react";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState<"table" | "analytics">("table");
  const [transactions, setTransactions] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    type: "",
    date: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ HANDLE SUBMIT
  const handleSubmit = () => {
    setTransactions([...transactions, formData]);

    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
      type: "",
      date: "",
    });

    handleClose();
  };

  // TOTALS
  const totalTransactions = transactions.length;

  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalTurnover = totalIncome + totalExpense;

  // PERCENTAGES
  const incomePercent = totalTurnover
    ? ((totalIncome / totalTurnover) * 100).toFixed(0)
    : 0;

  const expensePercent = totalTurnover
    ? ((totalExpense / totalTurnover) * 100).toFixed(0)
    : 0;

  return (
    <>
      <Header />

      <Container className="mt-3">
        {/* FILTER ROW */}
        <div className="filterRow">
          <div className="text-white">
            <Form.Group>
              <Form.Label>Select Frequency</Form.Label>
              <Form.Select>
                <option>Last Week</option>
                <option>Last Month</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="text-white">
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select>
                <option>All</option>
                <option>Expense</option>
                <option>Credit</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/* ICONS */}
          <div className="iconBtnBox">
            <span
              className={view === "table" ? "iconActive" : "iconDeactive"}
              onClick={() => setView("table")}
            >
              📋
            </span>

            <span
              className={view === "analytics" ? "iconActive" : "iconDeactive"}
              onClick={() => setView("analytics")}
            >
              📊
            </span>
          </div>

          {/* ADD NEW */}
          <div>
            <Button className="addNew" onClick={handleShow}>
              Add New
            </Button>
          </div>
        </div>

        {/* RESET */}
        <div className="containerBtn">
          <Button>Reset Filter</Button>
        </div>

        {/* TABLE */}
        {view === "table" ? (
        <table className="data-table">
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
            {transactions.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>🗑</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="analytics">
          <div className="card">
            <h4>Total Transactions: {totalTransactions}</h4>
            <p className="green">
              Income: {transactions.filter((t) => t.type === "credit").length}
            </p>
            <p className="red">
              Expense: {transactions.filter((t) => t.type === "expense").length}
            </p>

            <p>Income %: {incomePercent}%</p>
            <p>Expense %: {expensePercent}%</p>
          </div>

          <div className="card">
            <h4>Total Turnover: ₹{totalTurnover}</h4>
            <p className="green">Income: ₹{totalIncome}</p>
            <p className="red">Expense: ₹{totalExpense}</p>
          </div>
        </div>
      )}

    </Container>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Transaction Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter your Amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Utilities">Utilities</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                <option value="expense">expense</option>
                <option value="credit">credit</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
