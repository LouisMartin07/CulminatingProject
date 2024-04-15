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

// Add a slide to a specific hive
export const createSlide = async (hiveId, slide_number, notes = '') => {
  const email = getUserEmail();
  try {
    const response = await api.post(`/hive/beehives/${hiveId}/slides/?email=${encodeURIComponent(email)}`, {
      slide_number, // Correctly passing as a number
      notes        // Correctly passing as a string
    }, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error adding slide:', error.response?.data);
    return null;
  }
};


// Delete a slide from a hive
export const deleteSlide = async (slideId) => {
  const email = getUserEmail();
  try {
    await api.delete(`/hive/slides/${slideId}/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return true;  // Return true on successful deletion
  } catch (error) {
    console.error('Error deleting slide:', error.response?.data);
    return false;
  }
};

// Fetch slides for a specific hive
export const getSlides = async (hiveId) => {
  const email = getUserEmail();
  try {
    const response = await api.get(`/hive/beehives/${hiveId}/slides/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return response.data;  // Return list of slides in a specific hive
  } catch (error) {
    console.error('Error fetching slides:', error.response?.data);
    return null;
  }
};

// Update a specific slide
export const updateSlide = async (hiveId, slideId, slideData) => {
  const email = getUserEmail();
  try {
    const response = await api.put(`/hive/beehives/${hiveId}/slides/${slideId}/?email=${encodeURIComponent(email)}`, slideData, {
      headers: getAuthHeader()
    });
    return response.data;  // Return the updated slide
  } catch (error) {
    console.error('Error updating slide:', error.response?.data);
    return null;
  }
};
