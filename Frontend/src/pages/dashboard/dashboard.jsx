import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { fetchUserData, fetchWeatherData, kelvinToFahrenheit } from '../../utils/weather'; 
import './dashboard.css'; // Import custom CSS for styling

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (action) => {
    console.log(`Button clicked for ${action}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userData = await fetchUserData();
      if (userData && userData.zip_code) {
        const weatherData = await fetchWeatherData(userData.zip_code);
        if (weatherData && weatherData.main) {
          const formattedWeather = {
            name: weatherData.name,
            temp: kelvinToFahrenheit(weatherData.main.temp),
            feels_like: kelvinToFahrenheit(weatherData.main.feels_like),
            humidity: weatherData.main.humidity,
            wind_speed: weatherData.wind.speed,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon
          };
          setWeather(formattedWeather);
        }
      }
      setLoading(false);
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <Container fluid className="mt-5 dashboard-container">
        <header className="text-center mt-5 mb-4">
          <h1>Welcome to the Apiary Site</h1>
          <p>Introduction to the site and its features. Explore what you can do below.</p>
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="gold"
              className="mx-2 custom-button"
              onClick={() => handleButtonClick('newVoiceMeme')}
            >
              Make a New Voice Memo
            </Button>
            <Button
              variant="gold"
              className="mx-2 custom-button"
              onClick={() => handleButtonClick('newMemo')}
            >
              Type a New Memo
            </Button>
          </div>
        </header>

        <Row className="mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} md={4}>
              <Card className="mb-4 event-card">
                <Card.Body>
                  <Card.Title>{`Event ${index + 1}`}</Card.Title>
                  <Card.Text>
                    Details about the event. For instance, the event's date, time, and description.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {loading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <div className="weather-info text-center">
            <h4>Weather in {weather.name}:</h4>
            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="Weather icon" />
            <p>Temperature: {weather.temp}°F</p>
            <p>Feels Like: {weather.feels_like}°F</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind_speed} km/h</p>
            <p>Conditions: {weather.description}</p>
          </div>
        ) : (
          <p>Unable to load weather data.</p>
        )}

        <footer className="text-center mt-5">
          <p>Connect with us on social media</p>
          <Button variant="link">Facebook</Button>
          <Button variant="link">Twitter</Button>
          <Button variant="link">Instagram</Button>
          <div className="mt-3">
            <Button variant="outline-gold" onClick={() => handleButtonClick('aboutTheAuthor')}>
              About the Author
            </Button>
          </div>
        </footer>
      </Container>
    </>
  );
};

export default Dashboard;

