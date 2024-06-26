import api from '../axios';

// Helper function to get the token from localStorage
function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Token ${token}` };
}

// Helper function to get the user email from localStorage
function getUserEmail() {
  return localStorage.getItem('user_email');
}

// Function to fetch all bees associated with a specific slide
export const getBees = async (hiveId, slideId) => {
  const email = getUserEmail();
  try {
    const response = await api.get(`/hive/beehives/${hiveId}/slides/${slideId}/bees/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    return response.data;  // Return list of bees
  } catch (error) {
    console.error('Error fetching bees:', error.response?.data);
    return null;
  }
};

// Function to create a new bee in a specific slide
export const createBee = async (hiveId, slideId, beeData) => {
  const email = getUserEmail();
  console.log("Sending data:", { email, role: beeData.role, quantity: beeData.quantity });
  try {
    const response = await api.post(`/hive/beehives/${hiveId}/slides/${slideId}/bees/?email=${encodeURIComponent(email)}`, {
      slide: slideId,
      role: beeData.role,
      quantity: beeData.quantity
    });

    return response.data;  // Return the newly created bee
  } catch (error) {
    console.error('Error creating bee:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    return null;
  }
};

// Function to update the quantity of a specific bee
export const updateBeeQuantity = async (hiveId, slideId, beeId, newQuantity) => {
  const email = getUserEmail();
  try {
    const response = await api.put(`/hive/beehives/${hiveId}/slides/${slideId}/bees/${beeId}/?email=${encodeURIComponent(email)}`, { quantity: newQuantity }, {
      headers: getAuthHeader()
    });
    return response.data;  // Return updated bee data
  } catch (error) {
    console.error('Error updating bee quantity:', error.response?.data);
    return null;
  }
};

// Function to delete a specific bee
export const deleteBee = async (hiveId, slideId, beeId) => {
  const email = getUserEmail();
  try {
    const response = await api.delete(`/hive/beehives/${hiveId}/slides/${slideId}/bees/${beeId}/?email=${encodeURIComponent(email)}`, {
      headers: getAuthHeader()
    });
    if (response.status === 204) {
      return true;  // Indicate successful deletion
    }
    return false; // Handle other statuses as failures
  } catch (error) {
    console.error('Error deleting bee:', error.response?.data);
    return false;
  }
};