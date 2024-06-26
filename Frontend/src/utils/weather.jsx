import axios from 'axios';

export const kelvinToFahrenheit = (kelvin) => {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); // Convert and format to two decimal places
};

// Function to fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/users/profile/', {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

// Function to fetch weather data by zip code
export const fetchWeatherData = async (zipCode) => {
  try {
    const response = await axios.get(`http://localhost:8000/weather/${zipCode}/`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
};
