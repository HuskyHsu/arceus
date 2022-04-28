import json
from typing import List, Optional, Union

from pydantic import BaseModel


class Obtain(BaseModel):
    location: Union[None, str, List[str]]
    mode: str
    remark: Optional[str] = None


class Stats(BaseModel):
    HP: int
    Attack: int
    Defense: int
    Sp_Atk: int
    Sp_Def: int
    Speed: int
    TOTAL: int


class Evolution(BaseModel):
    name: str
    source: Optional[str] = None


class Pokemon(BaseModel):
    id: int
    pid: int
    name: str
    types: List[Union[str, List[str]]]
    alt_form: Optional[List[str]] = None
    obtain: List[Obtain]
    # props: List[str] = []
    stats: Union[list[int], list[list[int]]]  # Stats, List[Stats],
    # evolution: Optional[Evolution] = None


def location_code(name):
    areas = ["祝慶村", "黑曜原野", "紅蓮濕地", "群青海岸", "天冠山麓", "純白凍土"]
    if name in areas:
        return f'{areas.index(name)}'

    for i, area_name in enumerate(areas):
        if name in area[area_name]:
            return f'{i}-{area[area_name].index(name)}'

    print(name)
    return name


if __name__ == '__main__':

    with open('../src/data/baseInfo_new.json', 'rt', encoding='utf-8') as fin:
        all_pm = json.load(fin)

    with open('../src/data/fullInfo.json', 'rt', encoding='utf-8') as fin:
        all_pm_2 = json.load(fin)

    with open('../src/data/evolution.json', 'rt', encoding='utf-8') as fin:
        evolution = json.load(fin)

    with open('../src/data/area.json', 'rt', encoding='utf-8') as fin:
        area = json.load(fin)

    all_data = []
    for pm in all_pm[:]:
        pm['obtain'] = [
            Obtain(
                location=[location_code(l) for l in obtain[0].split('，')] if '，' in obtain[0] else (
                    None if obtain[0] == '' else location_code(obtain[0])),
                mode=obtain[1],
                remark=obtain[2] if len(obtain) > 2 else None
            ) for obtain in pm['obtain']
        ]

        evos = [e for e in evolution if e['after'] == pm['name']]
        if len(evos) > 0:
            pm['obtain'] += [
                Obtain(location=None, mode='進化', remark=evo['require']) for evo in evos
            ]

        pm['props'] = [
            prop[0] if len(prop) == 1 else '，'.join(prop) for prop in pm['props']
        ]

        pms = [pm_2 for pm_2 in all_pm_2 if pm_2['id'] == pm['id']]
        if len(pms) == 1:
            pm_stats = pms[0]['stats']
            # pm['stats'] = Stats(
            #     HP=pm_stats['HP'],
            #     Attack=pm_stats['Attack'],
            #     Defense=pm_stats['Defense'],
            #     Sp_Atk=pm_stats['Sp. Atk'],
            #     Sp_Def=pm_stats['Sp. Def'],
            #     Speed=pm_stats['Speed'],
            #     TOTAL=pm_stats['TOTAL']
            # )
            pm['stats'] = [pm_stats['HP'], pm_stats['Attack'],
                           pm_stats['Defense'], pm_stats['Sp. Atk'],
                           pm_stats['Sp. Def'], pm_stats['Speed']]
            if 'regional' in pm:
                pm['alt_form'] = [pm['regional'] + '的樣子']

        elif 'alt_form' in pm and len(pm['alt_form']) == len(pms):
            # pm['stats'] = [Stats(
            #     HP=pm_['stats']['HP'],
            #     Attack=pm_['stats']['Attack'],
            #     Defense=pm_['stats']['Defense'],
            #     Sp_Atk=pm_['stats']['Sp. Atk'],
            #     Sp_Def=pm_['stats']['Sp. Def'],
            #     Speed=pm_['stats']['Speed'],
            #     TOTAL=pm_['stats']['TOTAL']
            # ) for pm_ in pms]

            pm['stats'] = [
                [pm_['stats']['HP'], pm_['stats']['Attack'],
                 pm_['stats']['Defense'], pm_['stats']['Sp. Atk'],
                 pm_['stats']['Sp. Def'], pm_['stats']['Speed']
                 ] for pm_ in pms]
        else:
            print(pm['name'])
            print(json.dumps(pms, ensure_ascii=False))
            print('\n')

        pm = Pokemon(**pm)

        if pm.alt_form is not None and len(pm.alt_form) > 1:
            print(pm.name)
            for i in range(len(pm.alt_form)):
                pm_ = pm.dict()
                pm_['alt_form'] = [pm.alt_form[i]]
                if type(pm_['stats'][0]) is list:
                    pm_['stats'] = pm.stats[i]
                if type(pm_['types'][0]) is list:
                    pm_['types'] = pm.types[i]

                all_data.append(Pokemon(**pm_))
        else:
            all_data.append(pm)
        # print(pm)
        # print('\n')

        # if len(pm_) == 1:
        #     pm_ = pm_[0]

    with open('../src/data/pokemon.json', 'wt', encoding='utf-8') as fout:
        fout.write(json.dumps([pm.dict(exclude_none=True)
                   for pm in all_data], ensure_ascii=False))