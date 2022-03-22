import json
from typing import List, Optional, Union
from collections import defaultdict

from pydantic import BaseModel


class Obtain(BaseModel):
    location: Union[None, str, dict[str, list[int]]]
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
    alt_form: Optional[str] = None
    obtain: List[Obtain]
    stats: Union[str, list[int], list[list[int]]]
    # evolution: Optional[Evolution] = None


if __name__ == '__main__':

    with open('../src/data/pokemon.json', 'rt', encoding='utf-8') as fin:
        all_pm = json.load(fin)

    all_data = []
    for pm in all_pm[:]:
        for o in pm['obtain']:
            if 'location' in o and type(o['location']) is list:
                f = defaultdict(list)
                for l in o['location']:
                    location = l.split('-')
                    if len(location) > 1:
                        f[location[0]].append(int(location[1]))

                # obtain = []
                for k in f:
                    f[k].sort()
                #     obtain.append(f'{k}:{"-".join([str(k) for k in f[k]])}')
                o['location'] = dict(f)

            elif 'location' in o and type(o['location']) is str and '-' in o['location']:
                l = o['location'].split('-')
                o['location'] = {}
                o['location'][l[0]] = [l[1]]

        # pm['stats'] = ','.join(list(map(str, pm['stats'])))
        if 'alt_form' in pm:
            pm['alt_form'] = pm['alt_form'][0]

        pm = Pokemon(**pm)
        all_data.append(pm)

    with open('../src/data/pokemon_.json', 'wt', encoding='utf-8') as fout:
        fout.write(json.dumps([pm.dict(exclude_none=True)
                   for pm in all_data], ensure_ascii=False))
