import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../services/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to={user ? "/dashboard" : "/"}
        >
          <img
            src="/feldspar.png"
            alt="Feldspar Logo"
            width="100"
            height="50"
            className="me-2"
          />
          <span className="fw-bold text-primary d-none d-md-inline">
            TicketFlow
          </span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center gap-2">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${
                    isActive
                      ? "bg-primary bg-opacity-10 text-primary fw-semibold"
                      : "text-dark"
                  }`
                }
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/tickets"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${
                    isActive
                      ? "bg-primary bg-opacity-10 text-primary fw-semibold"
                      : "text-dark"
                  }`
                }
              >
                <i className="bi bi-ticket-perforated me-2"></i>
                Tickets
              </NavLink>
            </li>

            <li className="nav-item dropdown d-none d-lg-block ms-2">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center px-3 py-2 rounded bg-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="user-avatar me-2">
                  <i className="bi bi-person-circle fs-5 text-primary"></i>
                </div>
                <span className="fw-semibold">{user?.name || "Account"}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li className="px-3 py-2 border-bottom">
                  <small className="text-muted d-block">Signed in as</small>
                  <strong className="text-dark">{user?.email}</strong>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `dropdown-item d-flex align-items-center py-2 ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center py-2 text-danger"
                    href="#"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item d-lg-none">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${
                    isActive
                      ? "bg-primary bg-opacity-10 text-primary fw-semibold"
                      : "text-dark"
                  }`
                }
              >
                <i className="bi bi-person me-2"></i>
                Profile
              </NavLink>
            </li>
            <li className="nav-item d-lg-none">
              <a
                className="nav-link px-3 py-2 rounded text-danger"
                href="#"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </a>
            </li>
            {user && (
              <li className="nav-item d-lg-none mt-3 px-3">
                <div className="p-3 bg-light rounded">
                  <small className="text-muted d-block">Signed in as</small>
                  <strong className="text-dark">{user.name}</strong>
                  <small className="text-muted d-block">{user.email}</small>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
