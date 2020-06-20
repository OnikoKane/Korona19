import os
import django
import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LKorona19_SE.settings')
django.setup()

from se.documents import Korona19Document
from se.models import Korona19


class ESService:
    def search(self, tokens):
        rt = Korona19Document.search().filter('match', value=tokens)[:30]
        return rt.to_queryset()
