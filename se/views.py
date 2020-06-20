from django.http import HttpResponse
from django.shortcuts import render
# Create your views here.
from django.views import generic
from se.utils.ESSearch import ESService
from se.utils.graphSearch import GraphService
from se.utils.seq2tokens import WordHandler

# py manage.py runserver

gs = GraphService()
ess = ESService()
wordHandler = WordHandler()


def korona19(request):
    if request.method == 'GET':
        return render(request, "korona19.html")

    if request.method == "POST":
        sequence = request.POST.get("sequence")
        if sequence == '':
            return render(request, "korona19.html")

        # cut token for search(both)
        esword = wordHandler.esHandler(sequence=sequence)
        graphword = wordHandler.graphHandler(sequence=sequence)

        # Search
        esRt = ess.search(tokens=esword)
        # if flag is -1, then no content of graph for showing,
        graphRt = -1
        if graphword != -1:
            _rt1, _rt2, _rt3, _rt4 = gs.search(value=graphword)
            # return pk, pklabel, property_dictTo, property_dictFrom
            graphRt = {
                'pk': _rt1,  # 作为graph展示的标题
                'pklabel': _rt2,
                'property': _rt3,  # 属于该entity的属性
                'relate': _rt4,  # 被指向的属性 _rt4 -> entity
            }

        # ==============print==============
        print('=========')
        print(esword)
        print(graphword)
        print('=========')

        print(graphRt)
        print('==========')
        for i in esRt:
            print(i.label, ':', i.value)
        # ==============print==============

        return render(request, "search.html",
                      {
                          'graphRt': graphRt,
                          'esRt': esRt,
                      })
    render(request, 'korona19.html')

# def search(request):
#
#     return render(request, "search.html")
