import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
               className="w-full p-2 mb-3 border rounded" placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
               className="w-full p-2 mb-4 border rounded" placeholder="Password" required />
        <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-blue-600">Login</button>
        <p className="mt-4 text-center text-sm">Don't have an account? <a href="/register" className="text-primary underline">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
