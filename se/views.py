from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from se.utils.ESSearch import ESService
from se.utils.graphSearch import GraphService
from se.utils.seq2tokens import WordHandler
import json

# py manage.py runserver


gs = GraphService()
ess = ESService()
wordHandler = WordHandler()


@api_view(['GET', 'POST'])
def korona(request):
    if request.method == "POST":
        # sequence = request.GET.get("sequence")
        data = json.loads(request.body)
        sequence = data.get("sequence")

        # cut token for search(both)
        esword = wordHandler.esHandler(sequence=sequence)
        graphword = wordHandler.graphHandler(sequence=sequence)

        # Search
        esRt = ess.search(tokens=esword)
        # if flag is -1, then no content of graph for showing,
        if graphword != -1:
            graphRt = gs.search(value=graphword)
        else:
            graphRt = -1

        rt = {
            'graphRt': graphRt,
            'esRt': esRt,
        }
        # print(rt)
        # return Response(json.dumps(rt))

        return HttpResponse(json.dumps(rt))

# def korona(request):
#     global graphRt
#     if request.method == "POST":
#         data = json.loads(request.body)
#         sequence = data.get("sequence")
#         esword = wordHandler.esHandler(sequence=sequence)
#         graphword = wordHandler.graphHandler(sequence=sequence)
#         esRt = ess.search(tokens=esword)
#         esRt = esRt['hits']
#         # neo4j数据库中存在则返回数据
#         if graphword != -1:
#             graphRt = gs.search(value=graphword)
#         # 不存在则返回-1
#         if graphword == -1:
#             graphRt = -1
#         result = {'graphRt': graphRt, 'esRt': esRt}
#         return HttpResponse(json.dumps(result))
