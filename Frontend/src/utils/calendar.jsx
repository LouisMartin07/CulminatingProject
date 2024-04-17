import api from './axios';

export function formatDate(date) {
    return new Date(date).toISOString().slice(0, 10);
  }

// Helper function to get the token from localStorage
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Token ${token}` };
}

// Helper function to get the user email from localStorage
function getUserEmail() {
  return localStorage.getItem('user_email');
}

// Fetch all events
export const fetchEvents = async () => {
    try {
      const email = getUserEmail();
      const response = await api.get(`cal/events/?email=${encodeURIComponent(email)}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error.response?.data);
      return null;
    }
  };
  
  // Create a new event
  export const createEvent = async (eventData) => {
    try {
      const email = getUserEmail();
      const response = await api.post(`cal/events/?email=${encodeURIComponent(email)}`, eventData, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error.response?.data);
      return null;
    }
  };

// Update an event
export const updateEvent = async (eventId, eventData) => {
  try {
    const email = getUserEmail();
    const response = await api.put(`cal/${eventId}/?email=${encodeURIComponent(email)}`, eventData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.response?.data);
    return null;
  }
};

// Delete an event
export const deleteEvent = async (eventId) => {
  try {
    const email = getUserEmail();
    await api.delete(`cal/${eventId}/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error deleting event:', error.response?.data);
    return false;
  }
};
