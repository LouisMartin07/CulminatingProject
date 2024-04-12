import api from './axios'

// Create a new hive
export const createHive = async (name, location) => {
  try {
    const response = await api.post('api/beehives/', { name, location });
    return response.data;  // Return the created hive data
  } catch (error) {
    console.error('Error creating hive:', error.response?.data);
    return null;
  }
};

// Delete a hive
export const deleteHive = async (hiveId) => {
  try {
    await api.delete(`api/beehives/${hiveId}/`);
    return true;  // Return true on successful deletion
  } catch (error) {
    console.error('Error deleting hive:', error.response?.data);
    return false;
  }
};

// Fetch all hives
export const getHives = async () => {
    try {
      const response = await api.get('api/beehives/');
      return response.data;  // Return list of all hives
    } catch (error) {
      console.error('Error fetching hives:', error.response?.data);
      return null;
    }
  };


