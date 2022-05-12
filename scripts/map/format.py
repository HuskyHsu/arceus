import json

import requests
from bs4 import BeautifulSoup as bs
import numpy as np
from scipy.spatial import ConvexHull


def transfer(c):
    t = {
        "All Day": "全天",
        "Morning": "早上",
        "Day": "白天",
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


if __name__ == "__main__":

    with open("./cobaltcoastlands.json", "rt", encoding="utf-8") as fin:
        all_spawntable = json.load(fin)

    for spawn in all_spawntable:
        spawn["coords"] = [spawn["coords"][0], spawn["coords"][2], spawn["coords"][1]]

    spawntable = {}
    pm_name = set()

    for spawn in all_spawntable:
        if spawn["icon"] not in spawntable:
            spawntable[spawn["icon"]] = {}

        if spawn["tableID"] not in spawntable[spawn["icon"]]:
            spawntable[spawn["icon"]][spawn["tableID"]] = []

        spawntable[spawn["icon"]][spawn["tableID"]].append(spawn["coords"])

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

    for key in [k for k in spawntable.keys()]:
        del spawntable[key]
    spawntable["respawn"] = respawn

    with open("./cobaltcoastlands_.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(spawntable, ensure_ascii=False))

    for respawn in spawntable["respawn"]:
        tableId = respawn["id"]

        table_text = requests.get(
            f"https://www.serebii.net/pokearth/hisui/spawntable/{tableId}.txt"
        )
        data = table_text.text.replace("</tr> </tr>", "</tr>").replace(
            "<br /><br />", ""
        )
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
                pm_name.add(items[0][0])
                subtable.append(
                    {
                        "name": items[0][0],
                        "alpha": items[0][1],
                        "%": items[1],
                        "level": items[2],
                    }
                )

            clean_table.append({"condition": key, "data": subtable})

        # print(clean_table)

        with open(
            f"../../public/data/map/spawntable/{tableId}.json", "wt", encoding="utf-8"
        ) as fout:
            fout.write(json.dumps(clean_table, ensure_ascii=False))

    print(pm_name)
