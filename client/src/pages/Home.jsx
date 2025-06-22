// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
    if (user) navigate('/dashboard');
    }, [user, navigate]);

  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold mb-4">
          Track Your Finances Smartly
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-lg md:text-xl text-textSecondary max-w-xl">
          Manage your income and expenses in one place with powerful insights.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-6 flex gap-4">
          <Link to="/login" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600">Login</Link>
          <Link to="/register" className="border border-primary text-primary px-6 py-2 rounded hover:bg-blue-50">Register</Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Income/Expense Tracking", desc: "Quickly log and view your transactions." },
            { title: "Category Insights", desc: "See where your money goes with intuitive charts." },
            { title: "Secure & Private", desc: "Your data stays with you, encrypted and protected." },
          ].map((f, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-background p-6 rounded shadow">
              <h3 className="text-xl font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-textSecondary">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-12 px-4 text-center bg-card">
        <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold mb-4">
          Ready to take control?
        </motion.h2>
        <p className="text-textSecondary mb-6">Create your free account and start tracking now!</p>
        <Link to="/register" className="bg-success text-white px-6 py-2 rounded hover:bg-green-600">Get Started</Link>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-4 border-t bg-white text-textSecondary">
        © {new Date().getFullYear()} Finance Tracker — Built with 💙 by Ayush
      </footer>
    </div>
  );
};

export default Home;
