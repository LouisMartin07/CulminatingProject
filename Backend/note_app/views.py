from rest_framework import viewsets
from .serializer import NoteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

#viewset.ModeViewSet automatically impliments CRUD operations so no need to write out the methods.
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

