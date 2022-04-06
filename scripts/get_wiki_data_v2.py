import json

import requests
from bs4 import BeautifulSoup

def get_items(soup):
    result = soup.select('table tr td a[href="/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E4%BC%A0%E8%AF%B4_%E9%98%BF%E5%B0%94%E5%AE%99%E6%96%AF"]') #, title="寶可夢傳說 阿爾宙斯"

    items = []
    for r in result:
        tds = r.parent.parent.select('td')
        if len(tds) == 0:
            continue

        source = None
        h3 = r.parent.parent.parent.parent.find_previous_sibling('h3')
        if h3 is not None:
            source = [s.text for s in h3.select('span')][1]
        # print(source)

        info = [td.text.replace('\n', '').replace('\xa0', '') for td in tds][1:]
        # print(info)

        sub_info = ['' for _ in range(len(info))]
        if '*' in ''.join(info):
            sub_info = r.parent.parent.select('span[title]')
            sub_info = [ele['title'] for ele in sub_info]

        info = [item.replace('*', '') for item in info]

        if source == '獲得方式':
            continue
        else:
            items += [[name] if i == '' else [name, i] for name, i in zip(info, sub_info)]

    return items

def get_leveling_up(soup):
    result = soup.select('h4 a[href="/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E4%BC%A0%E8%AF%B4_%E9%98%BF%E5%B0%94%E5%AE%99%E6%96%AF"]') #, title="寶可夢傳說 阿爾宙斯"
    hash_map = {
        '進化': -1,
        '—': 0,
    }

    move = []

    for r in result:
        trs = r.parent.parent.find_next_sibling('table').select('tr[class="at-c bgwhite"]')
        for tr in trs:
            learn, mastery, name = [td.text.strip().replace('[詳]', '') for td in tr.select('td')[:3]]
            move.append((
                hash_map[learn] if learn in hash_map else int(learn),
                hash_map[mastery] if mastery in hash_map else int(mastery),
                name
            ))

    return move

def get_tutoring(soup):
    result = soup.select('h4 a[href="/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E4%BC%A0%E8%AF%B4_%E9%98%BF%E5%B0%94%E5%AE%99%E6%96%AF"]') #, title="寶可夢傳說 阿爾宙斯"

    move = []

    for r in result:
        t_move = r.parent.parent.find_next_sibling('table').find_next_sibling('table')
        # print(t_move)
        if t_move is None:
            return move

        trs = t_move.select('tr[class="bgwhite at-c"]')
        for tr in trs:
            td = tr.select('td')[0]
            move.append(td.text.strip().replace('[詳]', ''))

    return move

def get_wiki_info(name):
    print(name)

    response = requests.get(f"https://wiki.52poke.com/wiki/{name}", headers={
        'accept-language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6'
    })

    soup = BeautifulSoup(response.text, "html.parser")

    result = soup.select('table tr td a[href="/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E4%BC%A0%E8%AF%B4_%E9%98%BF%E5%B0%94%E5%AE%99%E6%96%AF"]') #, title="寶可夢傳說 阿爾宙斯"

    info_map = {
        'items': get_items(soup),
        'levelingUp': get_leveling_up(soup),
        'tutoring':get_tutoring(soup)
    }

    return info_map

if __name__ == '__main__':

    # pm = get_wiki_info('刺尾蟲')
    # print(pm)

    with open('../public/data/pokemon.json', 'rt', encoding='utf-8') as fin:
        all_pm = json.load(fin)

    data = [pm | get_wiki_info(pm['name']) for pm in all_pm[:]]
    with open('../public/data/pokemon_v2.json', 'wt', encoding='utf-8') as fout:
        fout.write(json.dumps(data, ensure_ascii=False))