import api from './axios'

// Function to create a new bee in a specific slide
export const createBee = async (slideId, beeData) => {
  try {
    const response = await api.post(`slides/${slideId}/bees`, beeData);
    return response.data;  // Return the newly created bee
  } catch (error) {
    console.error('Error creating bee:', error.response?.data);
    return null;
  }
};

// Function to delete a specific bee
export const deleteBee = async (beeId) => {
  try {
    const response = await api.delete(`bees/${beeId}`);
    return response.data;  // Confirmation of deletion
  } catch (error) {
    console.error('Error deleting bee:', error.response?.data);
    return null;
  }
};

// Fetch all bees associated with a specific slide
export const fetchBees = async (slideId) => {
  try {
    const response = await api.get(`slides/${slideId}/bees`);
    return response.data;  // Return list of bees
  } catch (error) {
    console.error('Error fetching bees:', error.response?.data);
    return null;
  }
};

// Update the quantity of bees
export const updateBeeQuantity = async (beeId, newQuantity) => {
  try {
    const response = await api.patch(`bees/${beeId}/`, { quantity: newQuantity });
    return response.data;  // Return updated bee data
  } catch (error) {
    console.error('Error updating bee quantity:', error.response?.data);
    return null;
  }
};
