from django.contrib import admin
from django.urls import path,include
from bee_app.urls import router as beekeeping_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')), # used for oauth defaults, can remove once React is setup
    path('users/', include('user_app.urls')), # set up url's manually per View
    path('api/', include(beekeeping_router.urls)), # set up uses DRF's auto urls
]
