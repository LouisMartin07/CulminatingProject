from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            user_profile = user.profile  
            user_data = {
                'user': user.username,
                'email': user.email,
                'zip_code': user_profile.zip_code
            }
            return Response(user_data)
        except AttributeError:
            return Response({'error': 'User profile not found'}, status=404)