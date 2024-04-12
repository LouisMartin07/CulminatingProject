import api from './axios'

  // Add a slide to a specific hive
export const createSlide = async (hiveId, slideNumber, notes = '') => {
  try {
    const response = await api.post(`/hive/beehives/${hiveId}/slides/`, { slideNumber, notes });
    return response.data;  // Return the created slide data
  } catch (error) {
    console.error('Error adding slide:', error.response?.data);
    return null;
  }
};

// Delete a slide from a hive
export const deleteSlide = async (slideId) => {
  try {
    await api.delete(`/hive/slides/${slideId}/`);
    return true;  // Return true on successful deletion
  } catch (error) {
    console.error('Error deleting slide:', error.response?.data);
    return false;
  }
};

// Fetch slides for a specific hive
export const getSlides = async (hiveId) => {
    try {
      const response = await api.get(`/hive/beehives/${hiveId}/slides/`);
      return response.data;  // Return list of slides in a specific hive
    } catch (error) {
      console.error('Error fetching slides:', error.response?.data);
      return null;
    }
  };

// Update a specific slide
export const updateSlide = async (hiveId, slideId, slideData) => {
  try {
    const response = await api.put(`/hive/beehives/${hiveId}/slides/${slideId}/`, slideData);
    return response.data;  // Return the updated slide
  } catch (error) {
    console.error('Error updating slide:', error.response?.data);
    return null;
  }
};
