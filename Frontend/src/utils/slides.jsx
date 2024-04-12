import api from './axios'

  // Add a slide to a specific hive
export const createSlide = async (hiveId, slideNumber, notes = '') => {
  try {
    const response = await api.post(`hives/${hiveId}/slides/`, { slideNumber, notes });
    return response.data;  // Return the created slide data
  } catch (error) {
    console.error('Error adding slide:', error.response?.data);
    return null;
  }
};

// Delete a slide from a hive
export const deleteSlide = async (slideId) => {
  try {
    await api.delete(`slides/${slideId}/`);
    return true;  // Return true on successful deletion
  } catch (error) {
    console.error('Error deleting slide:', error.response?.data);
    return false;
  }
};

// Fetch slides for a specific hive
export const getSlides = async (hiveId) => {
    try {
      const response = await api.get(`hives/${hiveId}/slides/`);
      return response.data;  // Return list of slides in a specific hive
    } catch (error) {
      console.error('Error fetching slides:', error.response?.data);
      return null;
    }
  };