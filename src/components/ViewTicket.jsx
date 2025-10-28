import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById, deleteTicket } from "../services/tickets";
import Header from "./Header";

export default function ViewTicket() {
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const fetchedTicket = getTicketById(ticketId);
        setTicket(fetchedTicket);
        setError("");
      } catch (err) {
        setError("Failed to load ticket: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [ticketId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      deleteTicket(ticketId);
      navigate("/tickets");
    } catch (err) {
      setError("Failed to delete ticket: " + err.message);
    }
  };

  const handleEdit = () => {
    navigate(`/tickets/edit/${ticketId}`);
  };

  const handleBack = () => {
    navigate("/tickets");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!ticket && !error) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="alert alert-warning">Ticket not found</div>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Tickets
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Ticket Details</h2>
          <div>
            <button className="btn btn-secondary me-2" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {ticket && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{ticket.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                ID: {ticket.id.slice(-4)}
              </h6>

              <div className="mb-3">
                <span
                  className={`badge bg-${
                    ticket.status === "open"
                      ? "danger"
                      : ticket.status === "in-progress"
                      ? "warning"
                      : "success"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="card-text">{ticket.description}</p>

              <div className="text-muted">
                <small>
                  Created: {new Date(ticket.createdAt).toLocaleString()}
                  {ticket.updatedAt && (
                    <>
                      <br />
                      Updated: {new Date(ticket.updatedAt).toLocaleString()}
                    </>
                  )}
                </small>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
