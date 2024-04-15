from django.db import models
from user_app.models import AppUser  

class BeeHive(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='beehives')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class Slide(models.Model):
    hive = models.ForeignKey(BeeHive, related_name='slides', on_delete=models.CASCADE)
    slide_number = models.PositiveIntegerField()
    notes = models.TextField(blank=True, null=True)
    inspected_at = models.DateTimeField(null=True, blank=True)

    #use a tuple to make sure each hive wont have a duplicated slide number
    class Meta:
        unique_together = ('hive', 'slide_number')

class Bee(models.Model):
    QUEEN = 'queen'
    WORKER = 'worker'
    GUARD = 'guard'
    LARVA = 'larva'
    MITE = 'mite'

    ROLE_CHOICES = [
        (QUEEN, 'Queen'),
        (WORKER, 'Worker'),
        (GUARD, 'Guard'),
        (LARVA, 'Larva'),
        (MITE, 'Mite'),
    ]

    slide = models.ForeignKey(Slide, related_name='bees', on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    quantity = models.PositiveIntegerField()