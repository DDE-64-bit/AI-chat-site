# Generated by Django 5.2 on 2025-05-09 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessage',
            name='room',
            field=models.CharField(default='default', max_length=255),
        ),
    ]
