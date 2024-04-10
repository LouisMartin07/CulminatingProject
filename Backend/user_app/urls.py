from django.urls import path
from .views import SignUp, LogIn, LogOut, UserInfo

urlpatterns = [
    path("", UserInfo.as_view()),
    path("signup/", SignUp.as_view()),
    path("login/", LogIn.as_view()),
    path("logout/", LogOut.as_view()),
]