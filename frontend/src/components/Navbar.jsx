"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => (location.pathname === path ? "active" : "")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text"></span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={`nav-link ${isActive("/")}`} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/orders" className={`nav-link ${isActive("/orders")}`} onClick={() => setMenuOpen(false)}>
                Orders
              </Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button
                className="nav-link logout-btn"
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className={`nav-link ${isActive("/login")}`} onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
