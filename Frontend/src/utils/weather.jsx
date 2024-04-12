import axios from 'axios';

export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/profile/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export const fetchWeatherData = async (zipCode) => {
  try {
    const response = await axios.get(`http://localhost:8000/weather/${zipCode}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
};
