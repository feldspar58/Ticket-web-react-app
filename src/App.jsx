import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import TicketPage from "./pages/Tickets/TicketPage";
import ProtectedRoute from "./components/protectedRoute";
import { Routes, Route } from "react-router-dom";
import TicketForm from "./components/TicketForm";
import EditTicket from "./components/EditTicket";
import ViewTicket from "./components/ViewTicket";
import Profile from "./pages/Profile";
import SessionManager from "./components/sessionManager";

function App() {
  return (
    <>
      <SessionManager>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <TicketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/edit/:ticketId"
            element={
              <ProtectedRoute>
                <EditTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets/:ticketId"
            element={
              <ProtectedRoute>
                <ViewTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SessionManager>
    </>
  );
}

export default App;
