# Generated by Django 5.0.4 on 2024-04-14 00:08

import user_app.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0002_appuser_zip_code'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='appuser',
            managers=[
                ('objects', user_app.models.AppUserManager()),
            ],
        ),
    ]