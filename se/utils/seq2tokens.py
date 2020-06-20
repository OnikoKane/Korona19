import jieba
import jieba.posseg as psg


class WordHandler:
    def __init__(self):
        path = r'C:\Users\Kane\PycharmProjects\LKorona19_SE\se\utils\data\SWs.txt'
        jieba.load_userdict(path)
        self.entity = []
        with open(path, 'r', encoding='utf-8') as f:
            c = f.readlines()
            for e in c:
                self.entity.append(e.replace('\n', ''))

    # 4ES
    def esHandler(self, sequence):
        sequence = sequence.lower()
        tokens = str([token for token in jieba.cut_for_search(sequence.replace(' ','')) if len(token) > 1]).replace("[|]","")
        return tokens

    # 4Graph
    def graphHandler(self, sequence):
        sequence = sequence.lower()
        nerRt = [(word, tag) for word, tag in psg.cut(sequence.replace(' ',''))]
        for i in nerRt:
            if i[0] in self.entity:
                return i[0]
        return -1
