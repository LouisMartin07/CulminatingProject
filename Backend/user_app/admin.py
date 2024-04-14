# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    model = AppUser
    fieldsets = (
        (None, {'fields': ('email', 'password', 'display_name', 'zip_code')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'display_name', 'zip_code', 'is_staff', 'is_active'),
        }),
    )
    list_display = ['email', 'display_name', 'is_active']
    search_fields = ('email', 'display_name')
    ordering = ('email',)

admin.site.register(AppUser, AppUserAdmin)


# painfully copy and pasted because the way I set up my AbstractUser, with username=email, when I would create a superuser it was only prompt for email and password then 
# tell me I need to enter a username without ever giving me the option too.