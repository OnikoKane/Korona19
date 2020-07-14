# entity = []
# with open(r'C:\Users\Kane\PycharmProjects\LKorona19_SE\se\utils\data\SWs.txt', 'r', encoding='utf-8') as f:
#     c = f.readlines()
#     for e in c:
#         entity.append(e.replace('\n', ''))
# print('钟南山' in entity)

import os
import django
import pandas as pd

'''
    单独运行django文件所需前置
'''
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LKorona19_SE.settings')
django.setup()

from se.utils.seq2tokens import WordHandler
from se.utils.graphSearch import GraphService
from se.utils.ESSearch import ESService
from py2neo import Graph
import json

wh = WordHandler()
gs = GraphService()
es = ESService()

sequence = '钟南山是谁呀'
tokens = wh.graphHandler(sequence=sequence)

print(tokens)
# 查询
graphrt = gs.search(value=tokens)
esrt = es.search(tokens=tokens)

print('=====Garph=====')
print(graphrt)

print('=====ES=====')
print(list(esrt.values('value', 'label', 'graph')))
# rt = {
#     'graphrt': graphrt,
#     'esrt': list(esrt.values('value', 'label', 'graph')),
# }
# print(json.dumps(rt))


