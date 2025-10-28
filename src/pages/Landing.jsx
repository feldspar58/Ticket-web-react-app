import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-wrapper">
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img
              src="/feldspar.png"
              alt="feldspar logo"
              className="brand-logo"
            />
            <span className="brand-name">TicketFlow</span>
          </div>
          <div className="nav-buttons">
            <button 
              className="btn-login" 
              onClick={handleLogin}
            >
              Login
            </button>
            <button 
              className="btn-get-started" 
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">TicketFlow</span>
            </h1>
            <p className="hero-description">
              Manage your tickets efficiently and effortlessly. Streamline your workflow, 
              track progress, and collaborate seamlessly with your team.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn-primary-large" 
                onClick={handleGetStarted}
              >
                Get Started Free
              </button>
              <button 
                className="btn-secondary-large" 
                onClick={handleLogin}
              >
                Login to Dashboard
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="https://img.freepik.com/free-vector/people-having-online-conference-call-laptop-screen_74855-5223.jpg"
              alt="Ticket Management Illustration"
              className="hero-img"
            />
          </div>
        </div>


        <div className="wave-container">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#ffffff" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>


      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose TicketFlow?</h2>
          <p className="section-subtitle">
            Everything you need to manage tickets in one place
          </p>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Real-time Tracking</h3>
              <p className="feature-description">
                Monitor all your tickets in real-time with our intuitive dashboard. 
                Stay updated on every status change instantly.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Create, update, and resolve tickets in seconds. Our streamlined 
                interface ensures maximum productivity.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Private</h3>
              <p className="feature-description">
                Your data is safe with us. Secure authentication and encrypted 
                storage keep your information protected.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Fully Responsive</h3>
              <p className="feature-description">
                Access your tickets from any device. Perfect experience on desktop, 
                tablet, and mobile devices.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                No learning curve required. Get started in minutes with our 
                user-friendly interface and intuitive design.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">Professional Tools</h3>
              <p className="feature-description">
                Powerful features designed for teams of all sizes. From solo users 
                to large organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of users who are already managing their tickets efficiently
            </p>
            <button 
              className="btn-cta-large" 
              onClick={handleGetStarted}
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
          <div className="footer-bottom">
            <p>&copy; 2025 TicketFlow. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}