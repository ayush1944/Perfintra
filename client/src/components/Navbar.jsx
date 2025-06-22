import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">Perfintra</h1>
      <button
        onClick={handleLogout}
        className="bg-danger text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;