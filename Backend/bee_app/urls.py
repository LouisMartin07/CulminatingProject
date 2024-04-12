from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BeeHiveViewSet, SlideViewSet, BeeViewSet

router = DefaultRouter()
router.register(r'beehives', BeeHiveViewSet)
router.register(r'bees', BeeViewSet)

# Assuming `SlideViewSet` is nested under `BeeHiveViewSet`
slides_router = DefaultRouter()
slides_router.register(r'slides', SlideViewSet, basename='hive-slides')

urlpatterns = [
    path('', include(router.urls)),
    # Nest slides under a specific beehive
    path('beehives/<int:hive_id>/', include(slides_router.urls)),
]