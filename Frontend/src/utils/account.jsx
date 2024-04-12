import api from './axios'

export const userConfirmation = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await api.get("users/", {
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
    await api.post("users/logout/");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error.response?.data);
    // Handle errors such as server not responding
  }
};