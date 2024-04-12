from rest_framework import viewsets
from .models import BeeHive, Slide, Bee
from .serializer import BeeHiveSerializer, SlideSerializer, BeeSerializer

class BeeHiveViewSet(viewsets.ModelViewSet):
    queryset = BeeHive.objects.all()
    serializer_class = BeeHiveSerializer

class SlideViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing slides.
    """
    serializer_class = SlideSerializer

    def get_queryset(self):
        """
        This view returns a list of all slides for a hive as determined by the hive ID portion of the URL.
        """
        hive_id = self.kwargs['hive_id']  # Get hive_id from URL parameters directly
        return Slide.objects.filter(hive_id=hive_id)  # Filter queryset based on hive_id

class BeeViewSet(viewsets.ModelViewSet):
    queryset = Bee.objects.all()
    serializer_class = BeeSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned bees to a given slide,
        by filtering against a `slide` query parameter in the URL.
        """
        queryset = Bee.objects.all()
        slide_id = self.request.query_params.get('slide')
        if slide_id is not None:
            queryset = queryset.filter(slide_id=slide_id)
        return queryset
