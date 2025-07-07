import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const token = localStorage.getItem("token");
  let username = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username || decoded.email || "";
    } catch {
      username = "";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar username={username} handleLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Navbar username={username} />
        <main className="flex-1 pt-16 md:pl-60 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
