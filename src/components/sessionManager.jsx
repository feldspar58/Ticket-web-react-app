import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, keepSessionAlive, logout } from '../services/auth';

export default function SessionManager({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const protectedRoutes = ['/dashboard', '/tickets', '/profile'];
      const isProtectedRoute = protectedRoutes.some(route => 
        location.pathname.startsWith(route)
      );

      if (isProtectedRoute && !isAuthenticated()) {
        logout();
        navigate('/login', { 
          state: { message: 'Session expired. Please login again.' } 
        });
      }
    };

    checkAuth();

    const handleActivity = () => {
      if (isAuthenticated()) {
        const success = keepSessionAlive();
        if (!success) {
          logout();
          navigate('/login', { 
            state: { message: 'Session expired. Please login again.' } 
          });
        }
      }
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    const intervalId = setInterval(() => {
      if (isAuthenticated()) {
        const success = keepSessionAlive();
        if (!success) {
          logout();
          navigate('/login', { 
            state: { message: 'Session expired. Please login again.' } 
          });
        }
      }
    }, 60000);

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(intervalId);
    };
  }, [navigate, location]);

  return children;
}