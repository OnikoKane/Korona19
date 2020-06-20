from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Korona19

'''
    对model进行两次migrate操作后执行下方命令（会自动创建index）
    py manage.py makemigrations

    py manage.py migrate

    py manage.py search_index --rebuild
    
    而ES数据的备份会自动存储在db.sqlite3文件中，若要重置ESIndex 需要删除该文件
'''


@registry.register_document
class Korona19Document(Document):
    class Index:  # 定义index(数据库)
        name = 'korona19'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Korona19
        fields = [
            'mapID',
            'value',
            'label',
            'graph',
        ]
