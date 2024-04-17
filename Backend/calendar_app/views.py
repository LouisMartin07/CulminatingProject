from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import Event
from .serializer import EventSerializer
from django.contrib.auth import get_user_model

User = get_user_model() #view automatically adapts to any user model defined in your settings.

class EventListCreate(APIView):
    def get(self, request):
        user_email = request.query_params.get('email')
        user = get_object_or_404(User, email=user_email)
        events = Event.objects.filter(user=user)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        user_email = request.query_params.get('email')
        user = get_object_or_404(User, email=user_email)
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)  # Associate the user with the event
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)  # Print errors to the console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventRetrieveUpdateDelete(APIView):
    def get(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(User, email=user_email)
        event = get_object_or_404(Event, pk=pk, user=user)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(User, email=user_email)
        event = get_object_or_404(Event, pk=pk, user=user)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(User, email=user_email)
        event = get_object_or_404(Event, pk=pk, user=user)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
