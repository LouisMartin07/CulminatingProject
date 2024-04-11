from django.urls import path
from .views import SignUp, LogIn, LogOut, UserInfo

urlpatterns = [
    path("", UserInfo.as_view()),
    path("signup/", SignUp.as_view(), name='signup'),
    path("login/", LogIn.as_view(), name='login'),
    path("logout/", LogOut.as_view(), name='logout'),
]