import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ background: "#fff", padding: "12px 24px", borderBottom: "1px solid #eee" }}>
      <div className="container nav">
        <div><Link to="/">Notes Manager</Link></div>
        <div>
          {token ? (
            <button onClick={handleLogout} className="btn-primary">Logout</button>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
