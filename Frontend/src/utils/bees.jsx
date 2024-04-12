import api from './axios';

// Function to fetch all bees associated with a specific slide
export const getBees = async (hiveId, slideId) => {
  try {
    const response = await api.get(`/beehives/${hiveId}/slides/${slideId}/bees/`);
    return response.data;  // Return list of bees
  } catch (error) {
    console.error('Error fetching bees:', error.response?.data);
    return null;
  }
};

// Function to create a new bee in a specific slide
export const createBee = async (hiveId, slideId, beeData) => {
  try {
    const response = await api.post(`/beehives/${hiveId}/slides/${slideId}/bees/`, beeData);
    return response.data;  // Return the newly created bee
  } catch (error) {
    console.error('Error creating bee:', error.response?.data);
    return null;
  }
};

// Function to update the quantity of a specific bee
export const updateBeeQuantity = async (hiveId, slideId, beeId, newQuantity) => {
  try {
    const response = await api.patch(`/beehives/${hiveId}/slides/${slideId}/bees/${beeId}/`, { quantity: newQuantity });
    return response.data;  // Return updated bee data
  } catch (error) {
    console.error('Error updating bee quantity:', error.response?.data);
    return null;
  }
};

// Function to delete a specific bee
export const deleteBee = async (hiveId, slideId, beeId) => {
  try {
    const response = await api.delete(`/beehives/${hiveId}/slides/${slideId}/bees/${beeId}/`);
    return response.data;  // Confirmation of deletion
  } catch (error) {
    console.error('Error deleting bee:', error.response?.data);
    return null;
  }
};
