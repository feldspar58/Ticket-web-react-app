import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { getTickets } from "../services/tickets";
import { getCurrentUser } from "../services/auth";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    resolvedPercentage: 0
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    try {
      const currentUser = getCurrentUser();
      setUser(currentUser);

      const allTickets = getTickets();
      setTickets(allTickets);

      const total = allTickets.length;
      const open = allTickets.filter(t => t.status === 'open').length;
      const inProgress = allTickets.filter(t => t.status === 'in-progress').length;
      const resolved = allTickets.filter(t => t.status === 'resolved').length;
      const resolvedPercentage = total > 0 ? Math.round((resolved / total) * 100) : 0;

      setStats({
        total,
        open,
        inProgress,
        resolved,
        resolvedPercentage
      });
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const handleCreateTicket = () => {
    navigate('/tickets/new');
  };

  const handleViewAllTickets = () => {
    navigate('/tickets');
  };

  const recentTickets = tickets.slice(-5).reverse();

  return (
    <>
      <Header />

      <div className="dashboard-wrapper bg-light py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm bg-gradient-primary text-white">
                <div className="card-body p-4">
                  <h2 className="mb-2">Welcome back, {user?.name}! 👋</h2>
                  <p className="mb-3 opacity-75">Manage your tickets efficiently</p>
                  <button 
                    className="btn btn-light"
                    onClick={handleCreateTicket}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Create New Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-ticket-detailed fs-1 text-primary"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="text-muted mb-0">Total Tickets</h6>
                      <h2 className="mb-0">{stats.total}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-exclamation-circle fs-1 text-warning"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="text-muted mb-0">Open</h6>
                      <h2 className="mb-0">{stats.open}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-hourglass-split fs-1 text-info"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="text-muted mb-0">In Progress</h6>
                      <h2 className="mb-0">{stats.inProgress}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-shrink-0">
                      <i className="bi bi-check-circle fs-1 text-success"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="text-muted mb-0">Resolved</h6>
                      <h2 className="mb-0">{stats.resolved}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-clock-history me-2 text-primary"></i>
                    Recent Tickets
                  </h5>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleViewAllTickets}
                  >
                    View All
                  </button>
                </div>
                <div className="card-body p-0">
                  {recentTickets.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {recentTickets.map(ticket => (
                        <div 
                          key={ticket.id} 
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                          onClick={handleViewAllTickets}
                          style={{ cursor: 'pointer' }}
                        >
                          <div>
                            <h6 className="mb-1">{ticket.title}</h6>
                            <small className="text-muted">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <span className={`badge ${
                            ticket.status === 'open' ? 'bg-warning' :
                            ticket.status === 'in-progress' ? 'bg-info' :
                            'bg-success'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-inbox display-1 text-muted opacity-25"></i>
                      <p className="text-muted mt-3">No tickets yet</p>
                      <button 
                        className="btn btn-primary"
                        onClick={handleCreateTicket}
                      >
                        Create Your First Ticket
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}