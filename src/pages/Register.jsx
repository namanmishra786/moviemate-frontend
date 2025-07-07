import { useState } from "react";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Only change inside handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await registerUser(form);
    localStorage.setItem("token", data.token); // ✅ Save token
    navigate("/dashboard");
  } catch (err) {
    setError("Registration failed. Try again.");
  }
};
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-xl shadow-md text-white space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-500">Create Account</h2>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-[#121212]">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-[#121212]">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-[#121212]">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-red-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
