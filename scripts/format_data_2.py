import json

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


def getLink(pm):
    pm["link"] = str(pm["id"]).zfill(3)
    pm["linkPid"] = str(pm["pid"]).zfill(3)
    if "altForm" in pm and pm["altForm"] in NameSuffix:
        pm["link"] += NameSuffix[pm["altForm"]]
        pm["linkPid"] += NameSuffix[pm["altForm"]]


if __name__ == "__main__":

    with open("../public/data/pokemon_full.json", "rt", encoding="utf-8") as fin:
        all_pm = json.load(fin)

    for pm in all_pm:
        with open(
            f"../public/data/pokemon/{pm['link']}.json", "wt", encoding="utf-8"
        ) as fout:
            fout.write(json.dumps(pm, ensure_ascii=False))

    # with open("../public/data/pokemon_full_new.json", "wt", encoding="utf-8") as fout:
    #     fout.write(json.dumps(all_pm, ensure_ascii=False))
