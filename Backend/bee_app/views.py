from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BeeHive, Slide, Bee, AppUser
from .serializer import BeeHiveSerializer, SlideSerializer, BeeSerializer

class BeeHiveListCreate(APIView):
    def get(self, request):
        user_email = request.query_params.get('email')  # Fetch user email from query parameters
        user = get_object_or_404(AppUser, email=user_email)
        beehives = BeeHive.objects.filter(user=user)
        serializer = BeeHiveSerializer(beehives, many=True)
        return Response(serializer.data)

    def post(self, request):
        user_email = request.query_params.get('email')  # Fetch user email from query parameters
        user = get_object_or_404(AppUser, email=user_email)
        beehive = BeeHive.objects.create(
            user=user,
            name=request.data['name'],
            location=request.data['location']
        )
        serializer = BeeHiveSerializer(beehive)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class BeeHiveRetrieveUpdateDelete(APIView):
    def get(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        beehive = get_object_or_404(BeeHive, pk=pk, user=user)  # Ensure beehive belongs to the user
        serializer = BeeHiveSerializer(beehive)
        return Response(serializer.data)

    def put(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        beehive = get_object_or_404(BeeHive, pk=pk, user=user)  # Validate user owns the beehive
        serializer = BeeHiveSerializer(beehive, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        beehive = get_object_or_404(BeeHive, pk=pk, user=user)  # Validate user owns the beehive
        beehive.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#-------------------------------------------------------------------Slide Views --------------------------------------------------------

class SlideListCreate(APIView):
    def get(self, request, hive_id):
        slides = Slide.objects.filter(hive_id=hive_id)
        serializer = SlideSerializer(slides, many=True)
        return Response(serializer.data)

    def post(self, request, hive_id):
        formData = {
            'hive': hive_id,
            'slide_number': int(request.data.get('slideNumber')),
            'notes': request.data.get('notes')
        }
        serializer = SlideSerializer(data=formData)
        if serializer.is_valid():
            serializer.save(hive_id=hive_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SlideRetrieveUpdateDelete(APIView):
    def get(self, request, hive_id, pk):
        slide = get_object_or_404(Slide, hive_id=hive_id, pk=pk)
        serializer = SlideSerializer(slide)
        return Response(serializer.data)

    def put(self, request, hive_id, pk):
        slide = get_object_or_404(Slide, hive_id=hive_id, pk=pk)
        serializer = SlideSerializer(slide, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, hive_id, pk):
        slide = get_object_or_404(Slide, hive_id=hive_id, pk=pk)
        slide.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#-------------------------------------------------------------------Bee Views --------------------------------------------------------

class BeeListCreate(APIView):
    def get(self, request, slide_id):
        bees = Bee.objects.filter(slide_id=slide_id)
        serializer = BeeSerializer(bees, many=True)
        return Response(serializer.data)

    def post(self, request, slide_id):
        data = request.data.copy()
        data['slide'] = slide_id  
        serializer = BeeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class BeeRetrieveUpdateDelete(APIView):
    def get(self, request, bee_id):
        bee = get_object_or_404(Bee, id=bee_id)
        serializer = BeeSerializer(bee)
        return Response(serializer.data)

    def put(self, request, bee_id):
        bee = get_object_or_404(Bee, id=bee_id)
        serializer = BeeSerializer(bee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bee_id):
        bee = get_object_or_404(Bee, id=bee_id)
        bee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)