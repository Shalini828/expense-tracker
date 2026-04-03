import { useEffect, useState } from "react";

type Transaction = {
  text: string;
  amount: number;
};

const Home = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

  const handleDelete = (index: number) => {
  const newTransactions = transactions.filter((_, i) => i !== index);
  setTransactions(newTransactions);
};
  // 🔥 ADD FUNCTION
  const handleAdd = () => {
    if (!text || !amount) return;

    const newTransaction = { text, amount };

    setTransactions([...transactions, newTransaction]);

    // clear inputs
    setText("");
    setAmount(0);
  };

  // 🔥 CALCULATIONS
  const amounts = transactions.map((t) => t.amount);

  const balance = amounts.reduce((acc, item) => acc + item, 0);

  const income = amounts
    .filter((amt) => amt > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense = amounts
    .filter((amt) => amt < 0)
    .reduce((acc, item) => acc + item, 0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="cards">
        <div className="card balance">
          <p>Balance</p>
          <h3>₹{balance}</h3>
        </div>

        <div className="card income">
          <p>Income</p>
          <h3>₹{income}</h3>
        </div>

        <div className="card expense">
          <p>Expense</p>
          <h3>₹{Math.abs(expense)}</h3>
        </div>
      </div>

      <div className="form">
        <h3>Add Transaction</h3>

        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (+income, -expense)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="transactions">
        <h3>History</h3>

        {transactions.map((t, index) => (
          <div key={index} className="transaction-item">
            <span>{t.text}</span>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ color: t.amount > 0 ? "green" : "red" }}>
                ₹{t.amount}
              </span>

              <button onClick={() => handleDelete(index)}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
