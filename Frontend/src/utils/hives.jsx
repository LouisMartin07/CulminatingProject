import api from './axios';

// Helper function to get the token from localStorage
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Token ${token}` };
}

// Helper function to get the user email from localStorage
function getUserEmail() {
  return localStorage.getItem('user_email');
}

// Create a new hive
export const createHive = async (name, location) => {
  try {
    const email = getUserEmail(); // Get user email
    const response = await api.post(`/hive/beehives/?email=${encodeURIComponent(email)}`, {
      name,
      location
    }, {
      headers: getAuthHeader()
    });
    return response.data;  // Return the created hive data
  } catch (error) {
    console.error('Error creating hive:', error.response?.data);
    return null;
  }
};

// Delete a hive
export const deleteHive = async (hiveId) => {
  try {
    const email = getUserEmail(); // Get user email
    await api.delete(`/hive/beehives/${hiveId}/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return true; 
  } catch (error) {
    console.error('Error deleting hive:', error.response?.data);
    return false;
  }
};

// Fetch all hives
export const getHives = async () => {
  try {
    const email = getUserEmail(); // Get user email
    const response = await api.get(`/hive/beehives/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return response.data;  // Return list of all hives
  } catch (error) {
    console.error('Error fetching hives:', error.response?.data);
    return null;
  }
};
