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
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        hive = get_object_or_404(BeeHive, id=hive_id, user=user)
        slides = Slide.objects.filter(hive=hive)
        serializer = SlideSerializer(slides, many=True)
        return Response(serializer.data)

    def post(self, request, hive_id):
        print("Request Data:", request.data)  
        print("Query Params:", request.query_params) 

        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        hive = get_object_or_404(BeeHive, id=hive_id, user=user)

        request.data['hive'] = hive.id  
        serializer = SlideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SlideRetrieveUpdateDelete(APIView):
    def get(self, request, hive_id, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        hive = get_object_or_404(BeeHive, id=hive_id, user=user)
        slide = get_object_or_404(Slide, pk=pk, hive=hive)
        serializer = SlideSerializer(slide)
        return Response(serializer.data)

    def put(self, request, hive_id, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        hive = get_object_or_404(BeeHive, id=hive_id, user=user)
        slide = get_object_or_404(Slide, pk=pk, hive=hive)
        serializer = SlideSerializer(slide, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, hive_id, pk):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        hive = get_object_or_404(BeeHive, id=hive_id, user=user)
        slide = get_object_or_404(Slide, pk=pk, hive=hive)
        slide.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#-------------------------------------------------------------------Bee Views --------------------------------------------------------

class BeeListCreate(APIView):
    def get(self, request, slide_id):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        slide = get_object_or_404(Slide, id=slide_id, hive__user=user)
        bees = Bee.objects.filter(slide=slide)
        serializer = BeeSerializer(bees, many=True)
        return Response(serializer.data)

    def post(self, request, slide_id):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        slide = get_object_or_404(Slide, id=slide_id, hive__user=user)
        serializer = BeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(slide=slide)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BeeRetrieveUpdateDelete(APIView):
    def get(self, request, bee_id):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        bee = get_object_or_404(Bee, id=bee_id, slide__hive__user=user)
        serializer = BeeSerializer(bee)
        return Response(serializer.data)

    def put(self, request, bee_id):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        bee = get_object_or_404(Bee, id=bee_id, slide__hive__user=user)
        serializer = BeeSerializer(bee, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bee_id):
        user_email = request.query_params.get('email')
        user = get_object_or_404(AppUser, email=user_email)
        bee = get_object_or_404(Bee, id=bee_id, slide__hive__user=user)
        bee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)