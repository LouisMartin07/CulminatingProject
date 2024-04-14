import api from './axios'

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await api.get("users/profile", {
        headers: { Authorization: `Token ${token}` }
      });
      return response.data.user;
    } catch (error) {
      console.error("Error confirming user:", error.response?.data);
    }
  }
  return null;
};


export const userRegistration = async (email, password, display_name, zip_code) => {
  try {
    const response = await api.post("users/signup/", { email, password, display_name, zip_code});
    if (response.status === 201) {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      return user;
    }
  } catch (error) {
    console.error("Registration error:", error.response?.data);
  }
  return null;
};

export const userLogIn = async (email, password) => {
  try {
    const response = await api.post("users/login/", { email, password });
    if (response.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      return user;
    }
  } catch (error) {
    console.error("Login error:", error.response?.data);
    // Handle errors such as incorrect credentials or server issues
  }
  return null;
};

export const userLogOut = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the stored token
    console.log("Token being sent:", token); // Log the token to verify its format and content
    const response = await api.post("users/logout/", {}, {
      headers: {
        'Authorization': `Token ${token}` // Update according to what your server expects
      }
    });
    console.log("Logout successful:", response.data); // Log response to check if logout was successful
    localStorage.removeItem("token"); // Remove the token from localStorage after logout
  } catch (error) {
    console.error("Logout error:", error); // Log the complete error object
    console.error("Detailed error data:", error.response ? error.response.data : "No additional error data available");
  }
};
