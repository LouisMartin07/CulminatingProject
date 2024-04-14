import http.client
import json

# Utility to fetch coordinates based on the zip code
def fetch_coordinates(zip_code, api_key):
    conn = http.client.HTTPSConnection("api.openweathermap.org")
    conn.request("GET", f"/geo/1.0/zip?zip={zip_code},GB&appid={api_key}")
    response = conn.getresponse()
    if response.status == 200:
        data = json.loads(response.read().decode())
        return data['lat'], data['lon']
    else:
        return None, None

# Utility to fetch weather data using coordinates
def fetch_weather(lat, lon, api_key):
    conn = http.client.HTTPSConnection("api.openweathermap.org")
    conn.request("GET", f"/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric")
    response = conn.getresponse()
    if response.status == 200:
        weather_data = json.loads(response.read().decode())
        return weather_data
    else:
        return None