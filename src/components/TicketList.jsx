import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, deleteTicket } from '../services/tickets';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const fetchedTickets = getTickets();
      setTickets(fetchedTickets);
      setError('');
    } catch (err) {
      setError('Failed to load tickets: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;
    
    try {
      await deleteTicket(ticketId);
      loadTickets();
    } catch (err) {
      setError('Failed to delete ticket: ' + err.message);
    }
  };

  const handleEdit = (ticketId) => {
    navigate(`/tickets/edit/${ticketId}`);
  };

  const handleView = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const handleCreateNew = () => {
    navigate('/tickets/new');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ticket List</h2>
        <button 
          className="btn btn-primary"
          onClick={handleCreateNew}
        >
          Create New Ticket
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tickets found. Create your first ticket!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <th scope="row">{ticket.id.slice(-4)}</th>
                  <td>{ticket.title}</td>
                  <td>
                    <span className={`badge bg-${
                      ticket.status === 'open' ? 'danger' :
                      ticket.status === 'in-progress' ? 'warning' :
                      'success'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleView(ticket.id)}
                      >
                        View
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(ticket.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(ticket.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
