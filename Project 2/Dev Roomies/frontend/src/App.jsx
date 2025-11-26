import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Matches from "./pages/Matches";
import Home from "./pages/Home"; // <-- import Home
import API, { setAuthToken } from "./services/api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  // --- Navbar with gradient ---
  const Navbar = () => (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">DevRoomies</h1>
      {token && (
        <button
          onClick={handleLogout}
          className="bg-black px-3 py-1 rounded hover:bg-gray-600 transition cursor-pointer"
        >
          Logout
        </button>
      )}
    </nav>
  );

  // --- Footer with matching gradient ---
  const Footer = () => (
    <footer className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center mt-auto">
      © 2025 DevRoomies. All Rights Reserved.
    </footer>
  );

  // --- Sidebar with soft purple shades ---
  const Sidebar = () => {
    const location = useLocation();
    const activeClass = (path) =>
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "hover:bg-purple-300";

    return (
      <div className="w-64 bg-purple-100 min-h-screen p-4 flex flex-col gap-2 shadow-lg">
        <Link to="/profile" className={`p-2 rounded ${activeClass("/profile")}`}>
          Profile
        </Link>
        <Link to="/matches" className={`p-2 rounded ${activeClass("/matches")}`}>
          Matches
        </Link>
      </div>
    );
  };

  // --- Layout wrapper for authenticated pages ---
  const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-100 to-pink-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        {/* Private Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile token={token} />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <PrivateRoute>
              <Layout>
                <Matches token={token} />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Redirect unknown paths to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
