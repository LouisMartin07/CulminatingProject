import api from './axios'

// Utility function to update the user's email
export const updateUserEmail = async (newEmail) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.put("users/update/email/", { email: newEmail }, {
          headers: { Authorization: `Token ${token}` }
        });
        // Handle response, e.g., update local storage, state, etc.
        return response.data;
      } catch (error) {
        console.error("Email update error:", error.response?.data);
        return null;
      }
    }
  };
  
  // Utility function to update the user's username
  export const updateUsername = async (newUsername) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.put("users/update/username/", { username: newUsername }, {
          headers: { Authorization: `Token ${token}` }
        });
        // Handle response
        return response.data;
      } catch (error) {
        console.error("Username update error:", error.response?.data);
        return null;
      }
    }
  };
  
  // Utility function to change the user's password
  export const changeUserPassword = async (currentPassword, newPassword) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.put("users/update/password/", { current_password: currentPassword, new_password: newPassword }, {
          headers: { Authorization: `Token ${token}` }
        });
        // Handle response
        return response.data;
      } catch (error) {
        console.error("Password change error:", error.response?.data);
        return null;
      }
    }
  };
