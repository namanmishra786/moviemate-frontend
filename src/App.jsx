import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useUser } from "./context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar username={user?.username || user?.email || ""} handleLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Navbar username={user?.username || user?.email || ""} />
        <main className="flex-1 pt-16 md:pl-60 p-6">
          <Outlet />
          <ToastContainer />
        </main>
      </div>
    </div>
  );
};

export default App;
