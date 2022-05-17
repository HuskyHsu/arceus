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


def format_pm_table_data(all_pm_table, ids_m):
    all_pm_table_ = {}
    for pid, ids in all_pm_table.items():
        pm = find_link_by_pid(int(pid))
        all_pm_table_[pm["link"]] = [i for i in ids if i in ids_m]

    return all_pm_table_


def sort_coords(coords):
    return [coords[0], coords[2], coords[1]]


def format_spawntable(all_spawntable):
    spawntable = {}

    for spawn in all_spawntable:
        if spawn["icon"] not in spawntable:
            spawntable[spawn["icon"]] = {}

        if spawn["tableID"] not in spawntable[spawn["icon"]]:
            spawntable[spawn["icon"]][spawn["tableID"]] = []

        spawntable[spawn["icon"]][spawn["tableID"]].append(spawn["coords"])

    return spawntable


def get_respawn(spawntable):
    respawn = []
    for key in spawntable["pokeball"].keys():
        base = {"id": key, "points": spawntable["pokeball"][key]}
        if len(spawntable["pokeball"][key]) < 3:
            respawn.append(base)
            continue

        spawntable["pokeball"][key] = [
            (row[0], row[1]) for row in spawntable["pokeball"][key]
        ]

        if len(list(set(spawntable["pokeball"][key]))) < 3:
            respawn.append(base)
            continue

        # print(spawntable["pokeball"][key])
        hull = ConvexHull(spawntable["pokeball"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        respawn.append(base)

    return respawn


def get_tree(spawntable):
    tree = []
    for key in spawntable["tree"].keys():
        base = {"id": key, "points": spawntable["tree"][key]}
        if len(spawntable["tree"][key]) < 3:
            tree.append(base)
            continue

        spawntable["tree"][key] = [(row[0], row[1]) for row in spawntable["tree"][key]]

        if len(list(set(spawntable["tree"][key]))) < 3:
            tree.append(base)
            continue

        # print(spawntable["tree"][key])
        hull = ConvexHull(spawntable["tree"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        tree.append(base)

    return tree


def get_crystal(spawntable):
    crystal = []
    for key in spawntable["crystal"].keys():
        base = {"id": key, "points": spawntable["crystal"][key]}
        if len(spawntable["crystal"][key]) < 3:
            crystal.append(base)
            continue

        spawntable["crystal"][key] = [
            (row[0], row[1]) for row in spawntable["crystal"][key]
        ]

        if len(list(set(spawntable["crystal"][key]))) < 3:
            crystal.append(base)
            continue

        # print(spawntable["crystal"][key])
        hull = ConvexHull(spawntable["crystal"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        crystal.append(base)

    return crystal


def get_alpha(spawntable):
    alpha = []
    for key in spawntable["alpha"].keys():
        print(f"boss {key}")
        if len(spawntable["alpha"][key]) == 1:
            clean_table = get_spawntable(key, True)[0]
            base = {
                **clean_table["data"][0]["pm"],
                **{
                    "point": spawntable["alpha"][key][0],
                    "level": int(clean_table["data"][0]["level"].split(" - ")[0]),
                    "time": clean_table["condition"].split(" - ")[0],
                },
            }
        else:
            print(key)

        alpha.append(base)

    return alpha


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


def find_link_by_name(name):
    match_pm = [pm for pm in all_pm if pm["name"] == name.split("(")[0]]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(name)
        if name == "狃拉":
            return match_pm[1]
        return match_pm[0]
    else:
        print(f"找不到啦~{name}")


def find_link_by_pid(pid):
    match_pm = [pm for pm in all_pm if pm["pid"] == pid]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(pid, match_pm[0]["name"])
        if match_pm[0]["name"] == "狃拉":
            return match_pm[1]
        return match_pm[0]
    else:
        print(f"找不到啦~{pid}")


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
        "紅蓮濕地",
        "群青海岸",
        "天冠山麓",
        "純白凍土",
    ]:  # "黑曜原野", "紅蓮濕地", "群青海岸", "天冠山麓", "純白凍土"
        all_spawntable = get_raw_data(area)
        all_pm_table = get_raw_pm_table_data(area)

        for spawn in all_spawntable:
            spawn["coords"] = sort_coords(spawn["coords"])

        spawntable = format_spawntable(all_spawntable)

        spawntable = {
            "respawn": get_respawn(spawntable),
            "tree": get_tree(spawntable),
            "crystal": get_crystal(spawntable),
            "boss": get_alpha(spawntable),
        }
        ids = [respawn["id"] for respawn in spawntable["respawn"]]
        ids += [respawn["id"] for respawn in spawntable["tree"]]
        ids += [respawn["id"] for respawn in spawntable["crystal"]]
        spawntable["pmTable"] = format_pm_table_data(all_pm_table, ids)

        overlapping_boss(spawntable)

        save_file(f"{base_output}/{area}.json", spawntable)

        # continue
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
