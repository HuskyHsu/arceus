import { Avatars } from "@/components";
import { BASE_URL } from "@/utils";
import clsx from "clsx";

function Map() {
  const pms = [
    {
      id: 41,
      pid: 418,
      name: "泳圈鼬",
      types: ["水"],
      genderDiff: false,
      link: "041",
      linkPid: "418",
      level: 31,
      nearby: "角鹿山道",
      position: [680, 308],
    },
    {
      id: 54,
      pid: 47,
      name: "派拉斯特",
      types: ["蟲", "草"],
      genderDiff: false,
      link: "054",
      linkPid: "047",
      level: 30,
      nearby: "角鹿高崗",
      position: [700, 560],
    },
    {
      id: 49,
      pid: 234,
      name: "驚角鹿",
      types: ["一般"],
      genderDiff: false,
      link: "049",
      linkPid: "234",
      level: 42,
      nearby: "角鹿高崗",
      position: [689, 435],
    },
    {
      id: 52,
      pid: 143,
      name: "卡比獸",
      types: ["一般"],
      genderDiff: false,
      link: "052",
      linkPid: "143",
      level: 45,
      nearby: "真砂平原",
      position: [341, 483],
    },
    {
      id: 60,
      pid: 65,
      name: "胡地",
      types: ["超能力"],
      genderDiff: true,
      link: "060",
      linkPid: "065",
      level: 60,
      nearby: "真砂平原",
      position: [110, 747],
    },
    {
      id: 16,
      pid: 404,
      name: "勒克貓",
      types: ["電"],
      genderDiff: true,
      link: "016",
      linkPid: "404",
      level: 40,
      nearby: "荒園開墾地",
      position: [197, 245],
    },
    {
      id: 65,
      pid: 428,
      name: "長耳兔",
      types: ["一般"],
      genderDiff: false,
      link: "065",
      linkPid: "428",
      level: 40,
      nearby: "深幽森林",
      position: [443, 954],
    },
    {
      id: 72,
      pid: 123,
      name: "飛天螳螂",
      types: ["蟲", "飛行"],
      genderDiff: true,
      link: "072",
      linkPid: "123",
      level: 42,
      nearby: "巨木戰場",
      position: [851, 935],
    },
    {
      id: 40,
      pid: 402,
      name: "音箱蟀",
      types: ["蟲"],
      genderDiff: true,
      link: "040",
      linkPid: "402",
      level: 30,
      nearby: "森林膳房",
      position: [544, 761],
    },
    {
      id: 11,
      pid: 400,
      name: "大尾狸",
      types: ["一般", "水"],
      genderDiff: true,
      link: "011",
      linkPid: "400",
      level: 16,
      nearby: "河口堤堰",
      position: [676, 813],
    },
    {
      id: 24,
      pid: 78,
      name: "烈焰馬",
      types: ["火"],
      genderDiff: false,
      link: "024",
      linkPid: "078",
      level: 40,
      nearby: "蹄鐵草原",
      position: [639, 118],
    },
    {
      id: 75,
      pid: 214,
      name: "赫拉克羅斯",
      types: ["蟲", "格鬥"],
      genderDiff: true,
      link: "075",
      linkPid: "214",
      level: 45,
      nearby: "險林",
      position: [890, 156],
    },
    {
      id: 13,
      pid: 397,
      name: "姆克鳥",
      types: ["一般", "飛行"],
      genderDiff: true,
      link: "013",
      linkPid: "397",
      level: 42,
      nearby: "馳風道",
      position: [470, 603],
    },
    {
      id: 47,
      pid: 75,
      name: "隆隆石",
      types: ["岩石", "地面"],
      genderDiff: false,
      link: "047",
      linkPid: "075",
      level: 30,
      nearby: "黑金隧道",
      position: [937, 298],
    },
    {
      id: 81,
      pid: 130,
      name: "暴鯉龍",
      types: ["水", "飛行"],
      genderDiff: true,
      link: "081",
      linkPid: "130",
      level: 40,
      nearby: "心齊湖",
      position: [100, 410],
    },
    {
      id: 63,
      pid: 392,
      name: "烈焰猴",
      types: ["火", "格鬥"],
      genderDiff: false,
      link: "063",
      linkPid: "392",
      level: 65,
      nearby: "玫瑰島",
      position: [329, 840],
    },
    {
      id: 88,
      pid: 242,
      name: "幸福蛋",
      types: ["一般"],
      genderDiff: false,
      link: "088",
      linkPid: "242",
      level: 62,
      nearby: "黑曜瀑布",
      position: [954, 431],
    },
    {
      id: 80,
      pid: 129,
      name: "鯉魚王",
      types: ["水"],
      genderDiff: true,
      link: "080",
      linkPid: "129",
      level: 55,
      nearby: "靠近黑金隧道的水邊",
      position: [841, 634],
    },
    {
      id: 35,
      pid: 42,
      name: "大嘴蝠",
      types: ["毒", "飛行"],
      genderDiff: true,
      link: "035",
      linkPid: "042",
      level: 35,
      nearby: "靠近黑金隧道",
      position: [930, 644],
    },
  ];

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <div
        className="relative aspect-square bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${BASE_URL}image/map/黑曜原野_LA.png)`,
        }}
      >
        {pms.map((pm, i) => {
          return (
            <div
              key={i}
              className={clsx(
                "flex flex-col justify-center items-center",
                "absolute -translate-y-2/4 -translate-x-2/4"
              )}
              style={{
                top: `${pm.position[1] / 10}%`,
                left: `${pm.position[0] / 10}%`,
              }}
            >
              <Avatars pm={pm} size={"S"} style={"ring-[3px]"} />
              <span className="text-xs text-center order-1">
                Lv. {pm.level}
              </span>
            </div>
          );
        })}
      </div>
      <div>
        {pms.map((pm) => {
          return (
            <ul key={pm.name} className="flex gap-4">
              <li>{pm.name}</li>
              <li>{pm.level}</li>
              <li>{pm.nearby}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Map;
