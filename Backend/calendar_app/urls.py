# urls.py in your Django app directory
from django.urls import path
from .views import EventListCreate, EventRetrieveUpdateDelete

urlpatterns = [
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDelete.as_view(), name='event-retrieve-update-delete'),
]
