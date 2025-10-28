import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { getCurrentUser, updateCurrentUser, logout } from "../services/auth";

export default function Profile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const updated = updateCurrentUser({ name, email });
      setSuccess("Profile updated successfully");
      setLoading(false);
      setName(updated.name);
      setEmail(updated.email);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          You must be logged in to view this page.
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mt-5" style={{ maxWidth: 700 }}>
        <h2 className="mb-4">Profile</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger ms-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </form>

        <div className="mt-4 text-muted">
          <small>
            Account created: {new Date(currentUser.createdAt).toLocaleString()}
          </small>
        </div>
      </div>
    </>
  );
}
