import json
import csv

import requests
from bs4 import BeautifulSoup as bs
import numpy as np
from scipy.spatial import ConvexHull


def transfer(c):

    t = {
        "All Day": "全天",
        "Morning": "早上",
        "Day": "中午",
        "Evening": "傍晚",
        "Night": "晚上",
        "All Weather": "不分天氣",
        "Rainstorm": "暴雨",
        "Snowstorm": "暴風雪",
        "Sunny": "晴天",
        "Cloudy": "多雲",
        "Drought": "乾旱",
        "Rain": "雨天",
        "Snow": "下雪",
        "Fog": "起霧",
    }
    for [key, val] in t.items():
        c = c.replace(key, val)

    return c


def get_name_map():
    with open("./nameMap.txt", "rt", encoding="utf-8") as fin:
        all_pm_list = csv.reader(fin)
        name_map = {row[1]: row[2] for row in all_pm_list}

    return name_map


def get_pm_base_list():
    with open("../../public/data/pokemon.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    return all_pm


def get_raw_data(area):
    with open(f"./{area}.json", "rt", encoding="utf-8") as fin:
        all_spawntable = json.load(fin)

    return all_spawntable


def get_raw_pm_table_data(area):
    with open(f"./pm/{area}.json", "rt", encoding="utf-8") as fin:
        all_pm_table = json.load(fin)

    return all_pm_table


def format_pm_table_data(
    all_pm_table,
    boss_list,
    event_list,
    ids_m,
    mass_ids,
    massive_ids,
    distortion_ids,
    other_event,
):
    all_pm_table_ = {}
    for pid, ids in all_pm_table.items():
        pm = find_link_by_pid(int(pid), 132 in ids)
        all_pm_table_[pm["link"]] = {
            "spawntables": [i for i in ids if i in ids_m],
            "boss": len([boss for boss in boss_list if pm["link"] == boss["link"]]) > 0,
            "event": len([boss for boss in event_list if pm["link"] == boss["link"]])
            > 0,
            "mass": len([i for i in ids if i in mass_ids]) > 0,
            "massive": len([i for i in ids if i in massive_ids]) > 0,
            "distortion": len([i for i in ids if i in distortion_ids]) > 0,
        }

        if (
            len(all_pm_table_[pm["link"]]["spawntables"]) == 0
            and not all_pm_table_[pm["link"]]["boss"]
            and not all_pm_table_[pm["link"]]["event"]
            and not all_pm_table_[pm["link"]]["mass"]
            and not all_pm_table_[pm["link"]]["massive"]
            and not all_pm_table_[pm["link"]]["distortion"]
        ):
            del all_pm_table_[pm["link"]]

    for link in list(other_event):
        if link in all_pm_table_:
            all_pm_table_[link] = True
        else:
            all_pm_table_[link] = {
                "spawntables": [],
                "boss": False,
                "event": True,
                "mass": False,
                "massive": False,
                "distortion": False,
            }

    return all_pm_table_


def sort_coords(coords):
    return [coords[0], coords[2], coords[1]]


def format_spawntable(all_spawntable):
    spawntable = {}
    attr = {}
    other_info = {}
    for spawn in all_spawntable:
        lay_name = spawn["layer"].strip()
        if lay_name not in spawntable:
            spawntable[lay_name] = {}

        if spawn["tableID"] not in spawntable[lay_name]:
            spawntable[lay_name][spawn["tableID"]] = []

        spawntable[lay_name][spawn["tableID"]].append(spawn["coords"])
        if "attr" in spawn:
            attr[spawn["tableID"]] = spawn["attr"]
            if spawn["tableID"] < 0:
                other_info[spawn["tableID"]] = {
                    "level": spawn["level"],
                    "link": spawn["link"],
                }
            if "shiny" in spawn:
                print("shiny")
                if spawn["tableID"] in other_info:
                    other_info[spawn["tableID"]]["shiny"] = spawn["shiny"]
                else:
                    other_info[spawn["tableID"]] = {
                        "shiny": spawn["shiny"],
                    }
                print(other_info[spawn["tableID"]])

    print([k for k in spawntable.keys()])
    return spawntable, attr, other_info


def get_respawn(spawntable):
    respawn = []
    for key in spawntable["layPokeball"].keys():
        base = {"id": key, "points": spawntable["layPokeball"][key]}
        if len(spawntable["layPokeball"][key]) < 3:
            respawn.append(base)
            continue

        spawntable["layPokeball"][key] = [
            (row[0], row[1]) for row in spawntable["layPokeball"][key]
        ]

        if len(list(set(spawntable["layPokeball"][key]))) < 3:
            respawn.append(base)
            continue

        # print(spawntable["layPokeball"][key])
        hull = ConvexHull(spawntable["layPokeball"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        respawn.append(base)

    return respawn


def get_tree(spawntable):
    tree = []
    for key in spawntable["layTree"].keys():
        base = {"id": key, "points": spawntable["layTree"][key]}
        if len(spawntable["layTree"][key]) < 3:
            tree.append(base)
            continue

        spawntable["layTree"][key] = [
            (row[0], row[1]) for row in spawntable["layTree"][key]
        ]

        if len(list(set(spawntable["layTree"][key]))) < 3:
            tree.append(base)
            continue

        # print(spawntable["layTree"][key])
        hull = ConvexHull(spawntable["layTree"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        tree.append(base)

    return tree


def get_crystal(spawntable):
    crystal = []
    for key in spawntable["layCrystal"].keys():
        base = {"id": key, "points": spawntable["layCrystal"][key]}
        if len(spawntable["layCrystal"][key]) < 3:
            crystal.append(base)
            continue

        spawntable["layCrystal"][key] = [
            (row[0], row[1]) for row in spawntable["layCrystal"][key]
        ]

        if len(list(set(spawntable["layCrystal"][key]))) < 3:
            crystal.append(base)
            continue

        # print(spawntable["layCrystal"][key])
        hull = ConvexHull(spawntable["layCrystal"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        crystal.append(base)

    return crystal


def get_alpha(spawntable):
    alpha = []
    for key in spawntable["layAlpha"].keys():
        print(f"boss {key}")
        if len(spawntable["layAlpha"][key]) == 1:
            clean_table = get_spawntable(key, True)[0]
            base = {
                **clean_table["data"][0]["pm"],
                **{
                    "point": spawntable["layAlpha"][key][0],
                    "level": int(clean_table["data"][0]["level"].split(" - ")[0]),
                    "time": clean_table["condition"].split(" - ")[0],
                    # "tableId": int(key),
                },
            }
        else:
            print(key)

        del base["locations"]
        alpha.append(base)

    return alpha


def get_event(spawntable, attr, other_info):
    event = []
    other_event = set()
    for key in spawntable["layEvent"].keys():
        print(f"event {key}")
        if len(spawntable["layEvent"][key]) == 1:
            if key > 0:
                clean_table = get_spawntable(key, True)[0]
                base = {
                    **clean_table["data"][0]["pm"],
                    **{
                        "point": spawntable["layEvent"][key][0],
                        "level": int(clean_table["data"][0]["level"].split(" - ")[0]),
                        "attr": attr[int(key)],
                        # "tableId": int(key),
                    },
                }
                del base["locations"]
                if int(key) in other_info and "shiny" in other_info[int(key)]:
                    base["shiny"] = other_info[int(key)]["shiny"]
            else:
                link = other_info[int(key)]["link"]
                base_pm = find_link_by_link(link)
                base = {
                    **base_pm,
                    **{
                        "point": spawntable["layEvent"][key][0],
                        "level": other_info[int(key)]["level"],
                        "attr": attr[int(key)],
                        # "tableId": int(key),
                    },
                }
                del base["locations"]
                other_event.add(link)

        else:
            print(key)

        event.append(base)

    return event, other_event


def get_unown(spawntable):
    unown = []
    for key in spawntable["layUnown"].keys():
        print(key)
        table_text = requests.get(
            f"https://www.serebii.net/pokearth/hisui/spawntable/{key}.txt"
        )

        # '/legendsarceus/pokemon/small/201-b.png'
        if "/legendsarceus/pokemon/small/201.png" in table_text.text:
            unown_type = "a"
        else:
            unown_type = table_text.text.split("/legendsarceus/pokemon/small/201-")[1][
                0
            ]

        base = {"id": key, "points": spawntable["layUnown"][key], "attr": unown_type}
        unown.append(base)

    return unown


def get_spiritomb(spawntable):
    spiritomb = []
    for key in spawntable["laySpiritomb"].keys():
        base = {"id": key, "points": spawntable["laySpiritomb"][key]}
        spiritomb.append(base)

    return spiritomb


def get_mass(spawntable):
    mass = [key for key in spawntable["laySwarm"].keys()]
    return mass


def get_massive(spawntable):
    massive = [key for key in spawntable["layMassive"].keys()]
    return massive


def get_distortion(spawntable):
    distortion = [key for key in spawntable["layDist"].keys()]
    return distortion


def overlapping_boss(spawntable):
    overlapping = set()
    has_overlapping = {}

    for boss in spawntable["boss"]:
        key = (boss["point"][0], boss["point"][1])
        if key in overlapping:
            has_overlapping[(boss["point"][0], boss["point"][1])] = True
        overlapping.add(key)

    for boss in spawntable["boss"]:
        key = (boss["point"][0], boss["point"][1])
        if key in has_overlapping:
            if has_overlapping[key]:
                boss["point"][0] -= 20
                has_overlapping[key] = not has_overlapping[key]
            else:
                boss["point"][0] += 20


def find_link_by_name(name, distortion=False):
    match_pm = [pm for pm in all_pm if pm["name"] == name.split("(")[0]]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(name)
        if name == "狃拉":
            return match_pm[0] if distortion else match_pm[1]
        return match_pm[0]
    else:
        print(f"找不到啦~{name}")


def find_link_by_pid(pid, distortion=False):
    match_pm = [pm for pm in all_pm if pm["pid"] == pid]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(pid, match_pm[0]["name"])
        if match_pm[0]["name"] == "狃拉":
            return match_pm[0] if distortion else match_pm[1]
        return match_pm[0]
    else:
        print(f"找不到啦~{pid}")


def find_link_by_link(link):
    match_pm = [pm for pm in all_pm if pm["link"] == link]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(link, match_pm[0]["name"])
        return match_pm[0]
    else:
        print(f"找不到啦~{link}")


def get_spawntable(id, full_info=False, prefix=""):
    table_text = requests.get(
        f"https://www.serebii.net/pokearth/hisui/spawntable/{id}.txt"
    )
    data = table_text.text.replace("</tr> </tr>", "</tr>").replace("<br /><br />", "")
    soup = bs(data, "html.parser")

    clean_table = []
    for i, table in enumerate(soup.select("table")):
        if i == 0:
            continue

        info = []
        key = None
        for j, row in enumerate(table.select("tr")):
            if j == 0:
                key = transfer(row.find("td").text)
                # clean_table[key] = []
            elif j == 2:
                info.append(
                    [
                        (
                            td.text,
                            (True if td.select('img[alt="Alpha"]') else False),
                        )
                        for td in row.select("td")
                    ]
                )
            elif j == 4:
                info.append(
                    [float(td.text.replace("%", "")) for td in row.select("td")]
                )
            elif j == 6:
                info.append([td.text for td in row.select("td")])

        subtable = []
        for items in zip(*info):
            name = name_map[items[0][0]]
            base_pm = find_link_by_name(name)
            if full_info:
                subtable.append(
                    {
                        "pm": base_pm,
                        "name": name,
                        "alpha": items[0][1],
                        "%": items[1],
                        "level": items[2],
                    }
                )
            else:
                subtable.append(
                    {
                        "link": base_pm["link"],
                        "name": name,
                        "alpha": items[0][1],
                        "%": items[1],
                        "level": items[2],
                    }
                )

        clean_table.append(
            {
                "condition": ("" if prefix == "" else prefix + " - ") + key,
                "data": subtable,
            }
        )

    return clean_table


def save_file(output_path, obj):
    with open(output_path, "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(obj, ensure_ascii=False))


name_map = get_name_map()
all_pm = get_pm_base_list()

if __name__ == "__main__":

    base_output = "../../public/data/map"

    for area in [
        "黑曜原野",
    ]:  # "黑曜原野", "紅蓮濕地", "群青海岸", "天冠山麓", "純白凍土"
        all_spawntable = get_raw_data(area)
        all_pm_table = get_raw_pm_table_data(area)

        for spawn in all_spawntable:
            spawn["coords"] = sort_coords(spawn["coords"])

        spawntable, attr, other_info = format_spawntable(all_spawntable)

        mass_ids = get_mass(spawntable)
        massive_ids = get_massive(spawntable)
        distortion_ids = get_distortion(spawntable)
        event, other_event = get_event(spawntable, attr, other_info)
        spawntable = {
            "respawn": get_respawn(spawntable),
            "tree": get_tree(spawntable),
            "crystal": get_crystal(spawntable),
            "boss": get_alpha(spawntable),
            "event": event,
            "spiritomb": get_spiritomb(spawntable),
            "unown": get_unown(spawntable),
        }
        # ids = [respawn["tableId"] for respawn in spawntable["boss"]]
        ids = [respawn["id"] for respawn in spawntable["respawn"]]
        ids += [respawn["id"] for respawn in spawntable["tree"]]
        ids += [respawn["id"] for respawn in spawntable["crystal"]]
        # ids += mass_ids
        spawntable["pmTable"] = format_pm_table_data(
            all_pm_table,
            spawntable["boss"],
            spawntable["event"],
            ids,
            mass_ids,
            massive_ids,
            distortion_ids,
            other_event,
        )

        overlapping_boss(spawntable)

        save_file(f"{base_output}/{area}.json", spawntable)

        continue
        for respawn in spawntable["respawn"]:
            tableId = respawn["id"]
            print(tableId)
            clean_table = get_spawntable(tableId, False)

            save_file(f"{base_output}/spawntable/{tableId}.json", clean_table)

        for respawn in spawntable["tree"]:
            tableId = respawn["id"]
            print(tableId)
            clean_table = get_spawntable(tableId, False, "搖晃的樹")

            save_file(f"{base_output}/spawntable/{tableId}.json", clean_table)

        for respawn in spawntable["crystal"]:
            tableId = respawn["id"]
            print(tableId)
            clean_table = get_spawntable(tableId, False, "搖晃的礦石")

            save_file(f"{base_output}/spawntable/{tableId}.json", clean_table)

    # for tableId in range(6, 7):
    #     print(tableId)
    #     clean_table = get_spawntable(tableId)
    #     save_file(f"{base_output}/spawntable/{tableId}.json", clean_table)
