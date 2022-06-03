import json
from typing import List, Optional, Union
from pydantic import BaseModel


class Base(BaseModel):
    type: str
    remark: Optional[str] = None


class Evolution(Base):
    pass


class Event(Base):
    location: str


class Catch(Base):
    location: str
    respawn: bool
    tree: bool
    crystal: bool
    boss: bool
    mass: bool
    massive: bool
    distortion: bool


class BasePm(BaseModel):
    id: int
    pid: int
    name: str
    altForm: Optional[str]
    types: List[str]
    genderDiff: bool
    link: str
    linkPid: str
    getMethods: List[Union[Catch, Event, Evolution]]


def get_full_data():
    with open("../public/data/pokemon_full.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    return all_pm


def save_base_data(all_pm):
    with open("../public/data/pokemon.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(all_pm, ensure_ascii=False))


if __name__ == "__main__":

    all_pm = get_full_data()
    new_pms = []
    for pm in all_pm:
        getMethods = []
        for getMethod in pm["getMethods"]:
            # print(getMethod)
            if getMethod["type"] == "catch":
                getMethods.append(Catch(**getMethod))
            elif getMethod["type"] == "event":
                getMethods.append(Event(**getMethod))
            elif getMethod["type"] == "evolution":
                getMethods.append(Evolution(**getMethod))
            else:
                print(pm["name"])
                print(getMethod)

        pm["getMethods"] = getMethods

        base_pm = BasePm(**pm)
        new_pms.append(base_pm.dict(exclude_none=True))

    save_base_data(new_pms)
