import json
from os import path

NameSuffix = {
    "洗翠": "H",
    "砂土蓑衣": "G",
    "垃圾蓑衣": "S",
    "晴天形態": "S",
    "白條紋": "W",
    "雌性": "F",
    "阿羅拉": "A",
    "加熱洛托姆": "O",
    "清洗洛托姆": "W",
    "結冰洛托姆": "R",
    "旋轉洛托姆": "F",
    "切割洛托姆": "L",
    "靈獸形態": "T",
    "起源形態": "O",
    "天空形態": "S",
}

if __name__ == "__main__":

    with open("../public/data/pokemon_v2.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    with open("../src/data/move.json", "rt", encoding="utf-8") as fin:
        all_move = json.load(fin)

    with open("../src/data/area.json", "rt", encoding="utf-8") as fin:
        all_area = json.load(fin)

    with open("../src/data/evolution.json", "rt", encoding="utf-8") as fin:
        all_evolution = json.load(fin)

    evolution_map = {}
    for evolution in all_evolution[:]:
        if evolution["before"] not in evolution_map:
            evolution_map[evolution["before"]] = []

        evolution_map[evolution["before"]].append(evolution)

    for evolution in evolution_map.copy():
        for sub_evolution in evolution_map[evolution]:
            if sub_evolution["after"] in evolution_map:
                sub_evolution["evolution"] = evolution_map[sub_evolution["after"]][:]

    for evolution in all_evolution[:]:
        evolution_map[evolution["after"]] = evolution_map[evolution["before"]]

    for pm in all_pm[:]:
        pm["learnset"] = {"levelingUp": [], "tutoring": []}

        for levelingUp in pm["levelingUp"]:
            move = [move for move in all_move if levelingUp[2] == move["name"]][
                0
            ].copy()
            move["learn"] = levelingUp[0]
            move["mastery"] = levelingUp[1]
            pm["learnset"]["levelingUp"].append(move)

        for tutoring in pm["tutoring"]:
            move = [move for move in all_move if tutoring == move["name"]][0].copy()
            pm["learnset"]["tutoring"].append(move)

        for getMethod in pm["getMethods"]:
            if "location" not in getMethod:
                continue

            if type(getMethod["location"]) == str:
                getMethod["location"] = all_area["area"][getMethod["location"]]
                continue

            keys = [key for key in getMethod["location"].keys()]
            for key in keys:
                area_name = all_area["area"][key]
                sub_area = all_area[area_name]
                getMethod["location"][area_name] = [
                    sub_area[i] for i in getMethod["location"][key]
                ]
                del getMethod["location"][key]

        del pm["levelingUp"]
        del pm["tutoring"]

        items = []
        for item in pm["items"]:
            items.append(
                {
                    "name": item[0].split("（")[0],
                    "%": int(item[0].split("（")[1].replace("%）", "")),
                    "boss": len(item) > 1,
                }
            )
        pm["items"] = items

        if pm["name"] in evolution_map:
            pm["evolution"] = evolution_map[pm["name"]]
        else:
            print(pm["name"])

        pm["link"] = str(pm["pid"]).zfill(3) + (
            (NameSuffix[pm["altForm"]] if pm["altForm"] in NameSuffix else "")
            if "altForm" in pm
            else ""
        )

        pm["genderDiff"] = path.exists(f"../public/image/pokemon/{pm['link']}_f.png")

    base_map = {}
    for pm in all_pm:
        info = {
            "id": pm["id"],
            "pid": pm["pid"],
            "name": pm["name"],
            "types": pm["types"],
            "genderDiff": pm["genderDiff"],
            "link": pm["link"],
        }
        if "altForm" in pm:
            info["altForm"] = pm["altForm"]

        base_map[pm["name"]] = info

    for i, pm in enumerate(all_pm):
        print(pm["name"])
        if "evolution" in pm:
            for ev in pm["evolution"]:
                if type(ev["before"]) == str:
                    ev["before"] = base_map[ev["before"]]

                if type(ev["after"]) == str:
                    ev["after"] = base_map[ev["after"]]

                if "evolution" in ev:
                    for ev2 in ev["evolution"]:
                        if type(ev2["before"]) == str:
                            ev2["before"] = base_map[ev2["before"]]

                        if type(ev2["after"]) == str:
                            ev2["after"] = base_map[ev2["after"]]

        if i > 0:
            pm["previous"] = {
                "id": all_pm[i - 1]["id"],
                "pid": all_pm[i - 1]["pid"],
                "name": all_pm[i - 1]["name"],
                "types": all_pm[i - 1]["types"],
                "genderDiff": all_pm[i - 1]["genderDiff"],
                "link": all_pm[i - 1]["link"],
            }
            if "altForm" in all_pm[i - 1]:
                pm["previous"]["altForm"] = all_pm[i - 1]["altForm"]
        else:
            pm["previous"] = None

        if i < len(all_pm) - 1:
            pm["next"] = {
                "id": all_pm[i + 1]["id"],
                "pid": all_pm[i + 1]["pid"],
                "name": all_pm[i + 1]["name"],
                "types": all_pm[i + 1]["types"],
                "genderDiff": all_pm[i + 1]["genderDiff"],
                "link": all_pm[i + 1]["link"],
            }
            if "altForm" in all_pm[i + 1]:
                pm["next"]["altForm"] = all_pm[i + 1]["altForm"]
        else:
            pm["next"] = None

    with open("../public/data/pokemon_full.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(all_pm, ensure_ascii=False))

    for pm in all_pm:
        with open(
            f"../public/data/pokemon/{pm['link']}.json", "wt", encoding="utf-8"
        ) as fout:
            fout.write(json.dumps(pm, ensure_ascii=False))

    base_pm = []
    for pm in all_pm:
        base = {
            "id": pm["id"],
            "pid": pm["pid"],
            "name": pm["name"],
            "types": pm["types"],
            "genderDiff": pm["genderDiff"],
            "link": pm["link"],
        }
        if "altForm" in pm:
            base["altForm"] = pm["altForm"]

        locations = []
        for method in pm["getMethods"]:
            if "location" in method:
                if type(method["location"]) == str:
                    locations.append(method["location"])
                else:
                    locations += method["location"].keys()

        base["locations"] = list(set(locations))
        base_pm.append(base)

    with open("../public/data/pokemon.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(base_pm, ensure_ascii=False))

        # pokemon.getMethods
        #   .map((get) => {
        #     if (typeof get.location === "string") {
        #       return get.location;
        #     } else if (typeof get.location === "object") {
        #       return Object.keys(get.location);
        #     }
        #   })
        #   .filter(Boolean)
        #   .flat()
        #   .map((location) => area[location as keyof typeof area])
