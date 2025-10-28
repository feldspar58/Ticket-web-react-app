import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../services/tickets';
import Header from '../components/Header';

export default function TicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newTicket = createTicket({
        title,
        description,
        status
      });

      console.log('Ticket created:', newTicket);
      
      navigate('/tickets');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/tickets');
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">Create New Ticket</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              rows="4" 
              placeholder="Enter ticket description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select 
              className="form-select" 
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}