from rest_framework import serializers
from .models import BeeHive, Slide, Bee

class BeeHiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeeHive
        fields = '__all__'

class SlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slide
        fields = '__all__'

class BeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bee
        fields = '__all__'