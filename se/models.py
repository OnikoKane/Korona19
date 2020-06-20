from django.db import models
from django.db.models import ForeignKey, AutoField
from django.forms import CharField, IntegerField, FloatField, DateField, DateTimeField
from elasticsearch import Elasticsearch


# Create your models here.

class Korona19(models.Model):
    mapID = models.CharField(max_length=100)
    value = models.CharField(max_length=400)
    label = models.CharField(max_length=100)
    graph = models.CharField(max_length=100)

