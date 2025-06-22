// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const COLORS = ["#4885ED", "#FFC107", "#4CAF50", "#F44336", "#9C27B0"];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "food",
    note: "",
    date: "",
  });
  const [filter, setFilter] = useState({ category: "", type: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    const res = await axios.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0 || !form.date)
      return toast.error("Please enter valid amount and date");

    try {
      await axios.post("/transactions", form);
      await fetchTransactions();
      setForm({ amount: "", type: "expense", category: "food", note: "", date: "" });
      toast.success("Transaction added successfully");
    } catch (err) {
      console.error("❌ Error adding transaction:", err.response?.data || err.message);
      toast.error("Failed to add transaction.");
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/transactions/${id}`);
    fetchTransactions();
    toast.success("Transaction deleted");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const filteredTransactions = transactions.filter((t) => {
    return (
      (!filter.category || t.category === filter.category) &&
      (!filter.type || t.type === filter.type)
    );
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const chartData = Object.values(
    filteredTransactions.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { name: t.category, value: 0 };
      acc[t.category].value += t.amount;
      return acc;
    }, {})
  );

  return (
    <div className={darkMode ? "dark:bg-gray-900 text-white min-h-screen" : "bg-background min-h-screen text-black"}>
      <Toaster />
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary dark:text-white">Perfintra</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(darkMode)} className="text-sm px-3 py-1 border rounded dark:text-white light:hover:bg-gray-600 dark:hover:bg-gray-600">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-danger text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-200 p-4 rounded shadow">
            <p className="text-sm">Income</p>
            <p className="text-lg text-success font-bold">₹{totalIncome}</p>
          </div>
          <div className="bg-white dark:bg-gray-200 p-4 rounded shadow">
            <p className="text-sm">Expense</p>
            <p className="text-lg text-danger font-bold">₹{totalExpense}</p>
          </div>
          <div className="bg-white dark:bg-gray-200 p-4 rounded shadow col-span-2">
            <p className="text-sm">Balance</p>
            <p className="text-lg text-primary font-bold">₹{totalIncome - totalExpense}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-200 p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="p-2 border rounded text-black" required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="p-2 border rounded text-black">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="p-2 border rounded text-black">
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="p-2 border rounded text-black" required />
          <input type="text" placeholder="Note (optional)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="p-2 border rounded md:col-span-2 text-black" />
          <button type="submit" className="bg-primary text-white p-2 rounded hover:bg-blue-600 md:col-span-2">Add Transaction</button>
        </form>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select onChange={(e) => setFilter({ ...filter, type: e.target.value })} className="p-2 border rounded text-black">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="p-2 border rounded text-black">
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>

        {/* Chart */}
        <div className="h-64 w-full bg-white dark:bg-gray-200 p-4 rounded shadow mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-200 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-300">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Note</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t._id}>
                    <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="p-2 capitalize">{t.type}</td>
                    <td className="p-2">{t.category}</td>
                    <td className={`p-2 font-semibold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>₹{t.amount}</td>
                    <td className="p-2">{t.note}</td>
                    <td className="p-2">
                      <button onClick={() => handleDelete(t._id)} className="text-danger hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
