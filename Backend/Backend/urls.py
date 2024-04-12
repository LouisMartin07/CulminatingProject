from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')), # used for oauth defaults, can remove once React is setup
    path('users/', include('user_app.urls')), # user_app urls
    path('hive/', include('bee_app.urls')), # bee_app urls
    path('/', include('weather_app.urls')), # weather_app urls
]
