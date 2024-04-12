from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from .models import AppUser


class SignUp(APIView):
    def post(self, request):
        # gets all request data
        data = request.data
        
        # created variables per parimeter to check against existing or not
        username_exists = AppUser.objects.filter(username=data.get('username')).exists() #.exists is optimizes for SQL querying and returns a boolean
        email_exists = AppUser.objects.filter(email=data.get('email')).exists()

        # error handling if username and email are not unique 
        if username_exists or email_exists:
            errors = {} # using a list to store the errors incase I add more parameters 
            if username_exists:
                errors['username'] = ['A user with that username already exists']
            if email_exists:
                errors['email'] = ['A user with that email already exists']
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        # if username and email are unique 
        user = AppUser(
            username = data.get('username', data.get('email')),
            email=data.get('email'),
            display_name=data.get('display_name', 'unknown'),
            zip_code=data.get('zip_code')
        )
        user.password = make_password(data.get('password')) #hashes the password before saving it and neccessary becuase save password is only for existing models
        try:
            user.full_clean()
            user.save()
            token = Token.objects.create(user=user)
            return Response({'user': user.display_name, 'token': token.key}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'errors': "Invalid credentiuals"}, status=status.HTTP_400_BAD_REQUEST)
        
class LogIn(APIView):
    def post(self, request):
        user = authenticate(email=request.data.get('email'), password=request.data.get('password'))
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'user': user.display_name, 'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
class LogOut(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post (self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class UserInfo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data
        
        # Update display name if provided
        user.display_name = data.get('display_name', user.display_name)
        
        # Update email if provided
        if 'email' in data:
            # Ensure the new email is unique and not already taken
            if AppUser.objects.filter(email=data['email']).exclude(id=user.id).exists():
                return Response({'error': 'This email is already in use.'}, status=status.HTTP_400_BAD_REQUEST)
            user.email = data['email']
        
        # Update username if provided
        if 'username' in data:
            # Ensure the new username is unique
            if AppUser.objects.filter(username=data['username']).exclude(id=user.id).exists():
                return Response({'error': 'This username is already taken.'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = data['username']
        
        # Change password if old and new are provided
        if 'password' in data and 'new_password' in data:
            if user.check_password(data['password']):
                user.set_password(data['new_password'])
            else:
                return Response({'error': 'Incorrect password'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save the changes
        try:
            user.full_clean()
            user.save()
            return Response({"message": "User info updated successfully."}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"errors": e.message_dict}, status=status.HTTP_400_BAD_REQUEST)
