from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('user_app.urls')), # user_app urls
    path('hive/', include('bee_app.urls')), # bee_app urls
    path('', include('weather_app.urls')), # weather_app urls
    path('cal/', include('calendar_app.urls')), #Calendar app urls
]
