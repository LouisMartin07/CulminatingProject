from django.urls import path
from .views import BeeHiveListCreate, BeeHiveRetrieveUpdateDelete, SlideListCreate, SlideRetrieveUpdateDelete, BeeListCreate, BeeRetrieveUpdateDelete

urlpatterns = [
    path('beehives/', BeeHiveListCreate.as_view()),
    path('beehives/<int:pk>/', BeeHiveRetrieveUpdateDelete.as_view()),
    path('beehives/<int:hive_id>/slides/', SlideListCreate.as_view()),
    path('beehives/<int:hive_id>/slides/<int:pk>/', SlideRetrieveUpdateDelete.as_view()),
    path('beehives/<int:hive_id>/slides/<int:slide_id>/bees/', BeeListCreate.as_view()),
    path('beehives/<int:hive_id>/slides/<int:slide_id>/bees/<int:bee_id>/', BeeRetrieveUpdateDelete.as_view()),
]