from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .utils import fetch_coordinates, fetch_weather
from user_app.models import AppUser

class GetWeatherByZip(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        api_key = '0a66bbe936e0be37ad5e64a8efda9ac3'
        this_user = request.user  # Directly use request.user assuming it is an instance of AppUser (Ty DJ)
        zip_code = this_user.zip_code  # Get the zip code directly from the logged in user

        if not zip_code:
            return JsonResponse({'error': 'User does not have a zip code set'}, status=400)

        lat, lon = fetch_coordinates(zip_code, api_key) 
        if lat is None or lon is None:
            return JsonResponse({'error': 'Invalid zip code or API error'}, status=404)

        weather_data = fetch_weather(lat, lon, api_key) 
        if weather_data:
            return JsonResponse(weather_data, safe=False) # safe=False to pass a non dictionary object to the front end API call
        else:
            return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)
