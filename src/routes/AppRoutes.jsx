import { Routes, Route } from "react-router-dom";
import App from "../App";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicFeed from "../pages/PublicFeed";
import UserWatchlist from "../pages/UserWatchlist";
import Search from "../pages/Search";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Pages WITHOUT Sidebar/Navbar */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ✅ Pages WITH Sidebar/Navbar */}
      <Route element={<App />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/public" element={<PublicFeed />} />
        <Route path="/user/:username" element={<UserWatchlist />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
