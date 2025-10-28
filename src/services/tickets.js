import { getCurrentUser } from './auth';

const TICKETS_KEY = 'ticketapp_tickets';

export const getTickets = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  
  const allTickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  return allTickets.filter(ticket => ticket.userId === currentUser.id);
};

export const getTicketById = (ticketId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  
  const allTickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  const ticket = allTickets.find(
    t => t.id === ticketId && t.userId === currentUser.id
  );
  
  if (!ticket) throw new Error('Ticket not found');
  return ticket;
};

export const createTicket = (ticketData) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  
  const allTickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  
  const newTicket = {
    id: Date.now().toString(),
    ...ticketData,
    userId: currentUser.id,
    createdAt: new Date().toISOString(),
    status: ticketData.status || 'open'
  };
  
  allTickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets));
  
  return newTicket;
};

export const updateTicket = (ticketId, updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  
  const allTickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  const ticketIndex = allTickets.findIndex(
    t => t.id === ticketId && t.userId === currentUser.id
  );
  
  if (ticketIndex === -1) throw new Error('Ticket not found');
  
  allTickets[ticketIndex] = {
    ...allTickets[ticketIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(TICKETS_KEY, JSON.stringify(allTickets));
  return allTickets[ticketIndex];
};

export const deleteTicket = (ticketId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error('Not authenticated');
  
  const allTickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  const filteredTickets = allTickets.filter(
    t => !(t.id === ticketId && t.userId === currentUser.id)
  );
  
  localStorage.setItem(TICKETS_KEY, JSON.stringify(filteredTickets));
  return { success: true };
};