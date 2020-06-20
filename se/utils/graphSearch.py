from py2neo import Graph

url = 'localhost:7474'
username = 'neo4j'
# password = 'neo4j'
password = 'kaneyd..369'


class GraphService:
    def __init__(self):
        self.graph = Graph(url, username=username, password=password)

    def search(self, value):
        pk = value
        # 人工智能
        spe = ['新冠', '新型冠状', '2019-nCoV', 'covid2019', '新冠病毒', '新型冠状病毒', 'covid', 'COVID', 'COVID19']
        if value in spe:
            pk = '新型冠状病毒'
            pklabel = self.graph.run("match (s) where s.value= '{}' return labels(s)".format('新型肺炎')).data()[0][
                'labels(s)']
            rtTo = []
            rtFrom = []
            for v in ['新型肺炎', '新型冠状病毒战役']:
                rtTo += self.graph.run(
                    "match (s)-[p]->(o) where s.value= '{}' return type(p), o.value, labels(o)".format(v)).data()
                rtFrom += self.graph.run(
                    "match (s)<-[p]-(o) where s.value= '{}' return type(p), o.value, labels(o)".format(v)).data()
        else:
            pklabel = self.graph.run("match (s) where s.value= '{}' return labels(s)".format(value)).data()[0][
                'labels(s)']
            rtTo = self.graph.run(
                "match (s)-[p]->(o) where s.value= '{}' return type(p), o.value, labels(o)".format(value)).data()
            rtFrom = self.graph.run(
                "match (s)<-[p]-(o) where s.value= '{}' return type(p), o.value, labels(o)".format(value)).data()

        property_dictTo = {}
        if pk == '新型冠状病毒':
            property_dictTo['别名'] = [('Concept String', n) for n in spe]
        for po in rtTo:
            if po['type(p)'] not in property_dictTo:
                property_dictTo[po['type(p)']] = [(po['labels(o)'][0], po['o.value']), ]
            else:
                property_dictTo[po['type(p)']].append((po['labels(o)'][0], po['o.value']))

        property_dictFrom = {}
        for po in rtFrom:
            if po['type(p)'] not in property_dictFrom:
                property_dictFrom[po['type(p)']] = [(po['labels(o)'][0], po['o.value']), ]
            else:
                property_dictFrom[po['type(p)']].append((po['labels(o)'][0], po['o.value']))

        return pk, pklabel, property_dictTo, property_dictFrom

# gs = GraphService()
# print(gs.searchGraph(label='人物', value='钟南山'))
