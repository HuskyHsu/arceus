import json

from requests import delete


if __name__ == "__main__":

    with open("../public/data/pokemon_v2.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    with open("../src/data/move.json", "rt", encoding="utf-8") as fin:
        all_move = json.load(fin)

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

    with open("../public/data/pokemon_v3.json", "wt", encoding="utf-8") as fout:
        fout.write(json.dumps(all_pm, ensure_ascii=False))
