import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('');
  const [theme, setTheme] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", { email, password, preferences: { currency, theme } });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
               className="w-full p-2 mb-3 border rounded" placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
               className="w-full p-2 mb-4 border rounded" placeholder="Password" required />
        <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)}
               className="w-full p-2 mb-4 border rounded" placeholder="Currency" required />
        <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)}
               className="w-full p-2 mb-4 border rounded" placeholder="Theme" required />
        <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-blue-600">Register</button>
        <p className="mt-4 text-center text-sm">Already have an account? <a href="/login" className="text-primary underline">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
