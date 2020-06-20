entity = []
with open(r'C:\Users\Kane\PycharmProjects\LKorona19_SE\se\utils\data\SWs.txt', 'r', encoding='utf-8') as f:
    c = f.readlines()
    for e in c:
        entity.append(e.replace('\n', ''))
print('钟南山' in entity)

from se.utils.seq2tokens import WordHandler
wh = WordHandler()
print(wh.esHandler('钟南山是谁呀'))