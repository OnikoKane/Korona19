import os
import django
import pandas as pd

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LKorona19_SE.settings')
django.setup()
'''
    单独运行django文件所需前置
'''

from se.documents import Korona19Document
from se.models import Korona19

'''
    Import
    一次导入 否则需要重置ES Index（避免数据重复）
'''
# mapID value label graph

# flist = os.listdir('data')
# counter = 0
# for name in flist:
#     data = pd.read_csv(r'data/' + name, encoding='utf-8')
#     print(name+"   Entity nums:" + str(len(data)))
#     for row in data.iterrows():
#         Korona19(mapID=row[1]['mapID'],
#                  value=row[1]['value'],
#                  label=row[1]['label'],
#                  graph=row[1]['graph']).save()
#         counter += 1
#         if counter % 4000 == 0:
#             print(counter)
# print('=======END=======')


'''
    除错
'''
# counter = 0
# data = pd.read_csv(r'data/character_entity.csv', encoding='utf-8')
# print("Entity nums:" + str(len(data)))
# for row in data.iterrows():
#     Korona19(mapID=row[1]['mapID'],
#              value=row[1]['value'],
#              label=row[1]['label'],
#              graph=row[1]['graph']).save()
#
#     # Korona19.objects.filter(mapID=row[1]['mapID'],
#     #                         value=row[1]['value'],
#     #                         label=row[1]['label'],
#     #                         graph=row[1]['graph']).delete()
#     counter += 1
#     if counter % 300 == 0:
#         print(counter)
# print('=======END=======')

'''
    Test
'''
# rt = Korona19.objects.filter(value="钟南山").delete()


s = Korona19Document.search().filter('match', value="'新型', '冠状', '病毒', '新型冠状病毒'")[:50]

# .search().query("match", value="钟南山")[:30]


# for i in s:
#     if i.label.split('_')[-1] not in ['String', 'Date','Entity']:
#         # value = i.value
#         # label = i.label
#         print(i.label,' ',i.value)
print(s)
for i in s :
    print(i.value, '  ', i.label)




# qs = s.to_queryset()
# for q in qs:
#     print(q.value)
