import http.client
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Utility to fetch weather data directly using zip code
def fetch_weather_by_zip(zip_code, api_key, country_code="us"):
    logger.debug(f"Fetching weather data for zip code: {zip_code} in country: {country_code}")
    conn = http.client.HTTPSConnection("api.openweathermap.org")
    request_path = f"/data/2.5/weather?zip={zip_code},{country_code}&appid={api_key}"
    conn.request("GET", request_path)
    response = conn.getresponse()
    data = response.read().decode()

    if response.status == 200:
        weather_data = json.loads(data)
        logger.debug("Weather data retrieved successfully: %s", weather_data)
        return weather_data
    else:
        logger.error("Failed to fetch weather data: %s, Response: %s", response.status, data)
        return None
