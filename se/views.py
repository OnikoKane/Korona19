from django.http import HttpResponse
from django.shortcuts import render
# Create your views here.
from django.views import generic
from se.utils.ESSearch import ESService
from se.utils.graphSearch import GraphService
from se.utils.seq2tokens import WordHandler

# py manage.py runserver

# from se.__init__ import gs, ess, wordHandler

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
        if graphword != -1:
            graphRt = gs.search(value=graphword)
        else:
            graphRt = -1


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
