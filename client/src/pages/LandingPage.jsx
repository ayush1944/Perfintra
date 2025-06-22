import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { title: "Track Expenses", desc: "Monitor where your money goes in real-time." },
  { title: "Visual Reports", desc: "Pie charts and bar graphs to show your finances clearly." },
  { title: "Secure Login", desc: "Your data is protected with JWT authentication." },
  { title: "Fully Responsive", desc: "Access on mobile, tablet, and desktop seamlessly." }
];

const LandingPage = () => {
  return (
    <div className="bg-background text-textPrimary">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-primary mb-4"
        >
          Personal Finance Tracker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-textSecondary max-w-2xl"
        >
          Take control of your money with a simple, secure and beautiful app. Track income, manage expenses and stay on top of your finances.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Link to="/register">
            <button className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-card text-center">
        <h2 className="text-3xl font-semibold mb-10 text-primary">Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-background p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
              <p className="text-textSecondary text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-white text-center px-6">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold mb-4"
        >
          Ready to Master Your Money?
        </motion.h2>
        <p className="text-lg mb-6 text-white/90">
          Start tracking your income and expenses in just a few clicks.
        </p>
        <Link to="/register">
          <button className="bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-gray-200 transition">
            Create Account
          </button>
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-6 bg-background text-textSecondary text-sm">
        © {new Date().getFullYear()} Personal Finance Tracker. Built by Ayush Pal.
      </footer>
    </div>
  );
};

export default LandingPage;
