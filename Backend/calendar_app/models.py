from django.db import models
from django.conf import settings

class Event(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField(blank=True)
    color = models.CharField(max_length=10, blank=True)
    url = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=100, blank=True)



    
# Flexibility: Using settings.AUTH_USER_MODEL allows you to define the user model once in your Django settings, and then reference this setting throughout your application. 
    # This makes it easier to change the user model in the future if needed without having to refactor all direct references to a specific user model.

# Future-proofing: Directly referencing a specific user model (like UserApp.AUTH_USER_MODEL) can lead to issues if you decide to change the user model later on. 
    # For instance, if you switch from a custom user model back to Django's default user model, you would need to update every instance where the custom model is directly referenced.

# Best Practices: Django's documentation and community recommendations strongly advocate using settings.AUTH_USER_MODEL to refer to the user model to ensure your app can be easily configured and reconfigured without major changes to the codebase.