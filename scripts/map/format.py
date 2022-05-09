import json

import requests
from bs4 import BeautifulSoup as bs

if __name__ == "__main__":

    with open("./cobaltcoastlands.json", "rt", encoding="utf-8") as fin:
        all_spawntable = json.load(fin)

    for spawn in all_spawntable:
        spawn["coords"] = [spawn["coords"][0], spawn["coords"][2], spawn["coords"][1]]

    spawntable = {}

    for spawn in all_spawntable:
        if spawn["icon"] not in spawntable:
            spawntable[spawn["icon"]] = {}

        if spawn["tableID"] not in spawntable[spawn["icon"]]:
            spawntable[spawn["icon"]][spawn["tableID"]] = []

        spawntable[spawn["icon"]][spawn["tableID"]].append(spawn["coords"])

    with open("./cobaltcoastlands_.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(spawntable, ensure_ascii=False))

    for tableId in spawntable["pokeball"].keys():

        table_text = requests.get(
            f"https://www.serebii.net/pokearth/hisui/spawntable/{tableId}.txt"
        )
        data = table_text.text.replace("</tr> </tr>", "</tr>").replace(
            "<br /><br />", ""
        )
        soup = bs(data, "html.parser")

        clean_table = {}
        for i, table in enumerate(soup.select("table")):
            if i == 0:
                continue

            info = []
            key = None
            for j, row in enumerate(table.select("tr")):
                if j == 0:
                    key = row.find("td").text
                    clean_table[key] = []
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

            for items in zip(*info):
                clean_table[key].append(
                    {
                        "name": items[0][0],
                        "alpha": items[0][1],
                        "%": items[1],
                        "level": items[2],
                    }
                )

        # print(clean_table)
        with open(f"./spawntable/{tableId}.json", "wt", encoding="utf-8") as fout:
            fout.write(json.dumps(clean_table, ensure_ascii=False))
