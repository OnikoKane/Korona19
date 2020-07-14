import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LKorona19_SE.settings')
django.setup()

from se.documents import Korona19Document
class ESService:
    def search(self, tokens):
        try:
            rt = Korona19Document.search().filter('match', value=tokens)[:30]
            rt = rt.to_queryset()
            return list(rt.values('value', 'label', 'graph'))
        except: return -1


# from elasticsearch import Elasticsearch
# class ESService:
#     def search(self, tokens):
#         es = Elasticsearch("localhost:9200")
#         query_json = {
#             "query": {
#                 "match": {
#                     "value": tokens
#                 }
#             }
#         }
#         query = es.search(index='korona19', body=query_json)
#         return query