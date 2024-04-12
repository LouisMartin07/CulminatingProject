from django.urls import path
from .views import get_weather_by_zip

urlpatterns = [
    path('weather/<str:zip_code>/', get_weather_by_zip, name='weather-by-zip'),
]
