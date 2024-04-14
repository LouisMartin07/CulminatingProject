from django.urls import path
from .views import GetWeatherByZip

urlpatterns = [
    path('weather/<str:zip_code>/', GetWeatherByZip.as_view(), name='weather-by-zip'),
]
