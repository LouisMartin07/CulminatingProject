import http.client
import json


# Utility to fetch weather data directly using zip code
def fetch_weather_by_zip(zip_code, api_key, country_code="us"):
    conn = http.client.HTTPSConnection("api.openweathermap.org")
    request_path = f"/data/2.5/weather?zip={zip_code},{country_code}&appid={api_key}"
    conn.request("GET", request_path)
    response = conn.getresponse()
    data = response.read().decode()

    if response.status == 200:
        weather_data = json.loads(data)
        return weather_data
    else:
        return None
