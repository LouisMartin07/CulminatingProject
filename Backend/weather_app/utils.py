import http.client
import json

def fetch_coordinates(zip_code, api_key):
    conn = http.client.HTTPSConnection("api.openweathermap.org")
    conn.request("GET", f"/geo/1.0/zip?zip={zip_code},GB&appid={api_key}")
    response = conn.getresponse()
    if response.status == 200:
        data = json.loads(response.read().decode())
        return data['lat'], data['lon']
    else:
        return None, None
