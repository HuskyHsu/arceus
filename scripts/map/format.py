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
        hull = ConvexHull(spawntable["pokeball"][key])
        base["convexHull"] = [int(i) for i in hull.vertices]
        respawn.append(base)

    return respawn


def get_alpha(spawntable):
    alpha = []
    for key in spawntable["alpha"].keys():
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


def find_link(name):
    match_pm = [pm for pm in all_pm if pm["name"] == name.split("(")[0]]
    if len(match_pm) == 1:
        return match_pm[0]
    elif len(match_pm) > 1:
        print(name)
        return match_pm[0]
    else:
        print(f"找不到啦~{name}")


def get_spawntable(id, full_info=False):
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
            base_pm = find_link(name)
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

        clean_table.append({"condition": key, "data": subtable})

    return clean_table


def save_file(output_path, obj):
    with open(output_path, "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(obj, ensure_ascii=False))


name_map = get_name_map()
all_pm = get_pm_base_list()

if __name__ == "__main__":

    base_output = "../../public/data/map"

    for area in ["群青海岸"]:
        all_spawntable = get_raw_data(area)

        for spawn in all_spawntable:
            spawn["coords"] = sort_coords(spawn["coords"])

        spawntable = format_spawntable(all_spawntable)

        spawntable = {"respawn": get_respawn(spawntable), "boss": get_alpha(spawntable)}

        save_file(f"{base_output}/{area}_.json", spawntable)

        continue
        for respawn in spawntable["respawn"]:
            tableId = respawn["id"]
            print(tableId)
            clean_table = get_spawntable(tableId)

            save_file(f"{base_output}/spawntable/{tableId}.json", clean_table)
