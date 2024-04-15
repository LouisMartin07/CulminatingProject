from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .utils import fetch_weather_by_zip
import logging

# Setup logger
logger = logging.getLogger(__name__)

class GetWeatherByZip(APIView):
    # permission_classes = [IsAuthenticated] # needs to have Username aka email and password but not sure how to get password

    def get(self, request, zip_code):
        logger.debug(f"Received weather request for zip code: {zip_code} from user: {request.user.username}")

        api_key = '0a66bbe936e0be37ad5e64a8efda9ac3'
        country_code = 'us'  # Dynamically set as needed

        try:
            weather_data = fetch_weather_by_zip(zip_code, api_key, country_code)
            if weather_data:
                logger.info(f"Weather data successfully retrieved for zip code: {zip_code}")
                return JsonResponse(weather_data, safe=False)
            else:
                logger.warning(f"Weather data retrieval failed for zip code: {zip_code}")
                return JsonResponse({'error': 'Failed to fetch weather data'}, status=500)
        except Exception as e:
            logger.error(f"An error occurred while fetching weather data: {str(e)}")
            return JsonResponse({'error': 'An internal error occurred'}, status=500)
