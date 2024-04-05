from django.shortcuts import render,redirect
from django.contrib.auth import logout

def home(request):
    if request.user.is_authenticated:
        print(request.user)
    return render(request, 'home.html')


def logout_view(request):
    logout(request)
    return redirect('/')
