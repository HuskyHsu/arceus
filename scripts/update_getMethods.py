import json
from operator import itemgetter
from typing import Optional
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


def get_full_data():
    with open("../public/data/pokemon_full.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    return all_pm


def save_full_data(all_pm):
    with open("../public/data/pokemon_full_new.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(all_pm, ensure_ascii=False))


def save_split(all_pm):
    for pm in all_pm:
        with open(
            f"../public/data/pokemon/{pm['link']}.json", "wt", encoding="utf-8"
        ) as fout:
            fout.write(json.dumps(pm, ensure_ascii=False))


def get_map_data(area_name):
    with open(f"../public/data/map/{area_name}.json", "rt", encoding="utf-8") as fin:
        area = json.load(fin)
    return area


def format_pm_map_data(area_name, map_data, all_pm, new_pmTable):
    respawn_ids = [p["id"] for p in map_data["respawn"]]
    tree_ids = [p["id"] for p in map_data["tree"]]
    crystal_ids = [p["id"] for p in map_data["crystal"]]

    for link, mapPm in map_data["pmTable"].items():
        if link not in new_pmTable:
            new_pmTable[link] = []

        full_pm = [pm for pm in all_pm if pm["link"] == link][0]

        if (
            len(mapPm["spawntables"]) > 0
            or mapPm["boss"]
            or mapPm["mass"]
            or mapPm["massive"]
            or mapPm["distortion"]
        ):
            remark = [
                method["remark"]
                for method in full_pm["getMethods"]
                if method["mode"] == "野生"
                and "remark" in method
                and method["remark"] != "時空歪曲"
            ]

            catch = Catch(
                **{
                    "type": "catch",
                    "location": area_name,
                    "respawn": len(
                        [id for id in mapPm["spawntables"] if id in respawn_ids]
                    )
                    > 0,
                    "tree": len([id for id in mapPm["spawntables"] if id in tree_ids])
                    > 0,
                    "crystal": len(
                        [id for id in mapPm["spawntables"] if id in crystal_ids]
                    )
                    > 0,
                    "boss": mapPm["boss"],
                    "mass": mapPm["mass"],
                    "massive": mapPm["massive"],
                    "distortion": mapPm["distortion"],
                }
            )
            if len(remark) > 0:
                catch.remark = remark[0]

            new_pmTable[link].append(catch.dict(exclude_none=True))

        if mapPm["event"]:
            for e in [e["attr"] for e in map_data["event"] if e["link"] == link]:
                event = Event(
                    **{
                        "type": "event",
                        "location": area_name,
                        "remark": e,
                    }
                )
                new_pmTable[link].append(event.dict(exclude_none=True))

    # return {key: val for key, val in sorted(new_pmTable.items(), key=itemgetter(0))}


def get_all_map_data(all_pm, new_pmTable):
    area_list = [
        "祝慶村",
        "黑曜原野",
        "紅蓮濕地",
        "群青海岸",
        "天冠山麓",
        "純白凍土",
    ]  # "黑曜原野", "紅蓮濕地", "群青海岸", "天冠山麓", "純白凍土"

    for area_name in area_list:
        format_pm_map_data(area_name, get_map_data(area_name), all_pm, new_pmTable)

    for full_pm in all_pm:
        evolution_info = [
            method["remark"]
            for method in full_pm["getMethods"]
            if method["mode"] == "進化"
        ]
        if len(evolution_info) > 0:
            if full_pm["link"] not in new_pmTable:
                new_pmTable[full_pm["link"]] = []

            evolution = Evolution(**{"type": "evolution", "remark": evolution_info[0]})
            new_pmTable[full_pm["link"]].append(evolution.dict(exclude_none=True))


if __name__ == "__main__":

    all_pm = get_full_data()

    new_pmTable = {}
    get_all_map_data(all_pm, new_pmTable)
    # print(new_pmTable)
    print(len(new_pmTable.keys()))
    for pm in all_pm:
        if pm["link"] in new_pmTable:
            pm["getMethods"] = new_pmTable[pm["link"]]
            continue
        if pm["link"][:-1] in new_pmTable:
            pm["getMethods"] = new_pmTable[pm["link"][:-1]]
            continue
        if (pm["link"] + "O") in new_pmTable:
            pm["getMethods"] = new_pmTable[pm["link"] + "O"]
            continue

        print(pm["name"], pm["altForm"] if "altForm" in pm else "")

    save_split(all_pm)
    save_full_data(all_pm)
