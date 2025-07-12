import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import {toast} from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(form); // ✅
      localStorage.setItem("token", data.token);
       toast.success("Login succesful!")
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-xl shadow-md text-white space-y-6">
        <h2 className="text-3xl font-bold text-center text-red-500">Login to MovieMate</h2>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-[#121212]">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded px-3 py-2 bg-[#121212]">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent w-full outline-none text-white"
              required
            />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account? <a href="/register" className="text-red-400 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
