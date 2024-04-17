from django.urls import path
from .views import SignUp, LogIn, LogOut, UserInfoUpdate, UpdateEmail, UpdatePassword, UpdateUsername

urlpatterns = [
    path("profile/", UserInfoUpdate.as_view()),
    path("profile/update/email/", UpdateEmail.as_view()),  # Specific endpoint for email updates
    path("profile/update/username/", UpdateUsername.as_view()),  # Specific endpoint for username updates
    path("profile/update/password/", UpdatePassword.as_view()),  # Specific endpoint for password updates
    path("signup/", SignUp.as_view(), name='signup'),
    path("login/", LogIn.as_view(), name='login'),
    path("logout/", LogOut.as_view(), name='logout'),
]