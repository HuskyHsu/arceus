import clsx from "clsx";

import areaMap from "@/data/area.json";
import { Avatars, Icon, Table } from "@/components";
import { BasePokemon, Filter } from "@/models";
import { BASE_URL, useFilter } from "@/utils";
import { flushSync } from "react-dom";

interface Pokemon extends BasePokemon {
  level: number;
  nearby: string;
  position: number[];
}

interface MarkerProps {
  pm: Pokemon;
}

interface MapProps {
  pmList: Pokemon[];
}

interface FilterProps {
  toggereAreaSelect: Function;
  updateAreaSelect: Function;
  filter: Filter;
}

function Marker({ pm }: MarkerProps) {
  return (
    <div
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
    </div>
  );
}

function MapDom({ pmList }: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/黑曜原野_LA.png)`,
        height: "100vmin",
      }}
    >
      {pmList.map((pm, i) => {
        return <Marker key={i} pm={pm} />;
      })}
    </div>
  );
}

function AreaSelect({
  filter,
  toggereAreaSelect,
  updateAreaSelect,
}: FilterProps) {
  return (
    <div className="">
      <button
        type="button"
        className="w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1"
        onClick={() => toggereAreaSelect()}
      >
        <span></span>
        {filter.area}
        <Icon.Down className="h-6 w-6" />
      </button>
      <ul
        className={clsx(
          "absolute z-20 w-32 mt-4 px-2 flex flex-col justify-center",
          "bg-white rounded-md shadow-md border-2",
          { hidden: !filter.areaSelector }
        )}
      >
        {Object.keys(areaMap.area)
          .sort()
          .filter((a) => Number(a) > 0)
          .map((a, i, arr) => {
            return (
              <li
                className={clsx(
                  "py-2 hover:bg-gray-200 text-center",
                  "transition-colors duration-200 transform cursor-pointer",
                  { "border-b-2": i !== arr.length - 1 }
                )}
                key={a}
                onClick={() =>
                  updateAreaSelect(areaMap.area[a as keyof typeof areaMap.area])
                }
              >
                {areaMap.area[a as keyof typeof areaMap.area]}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function Map() {
  const pmList = [
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

  const feilds = [
    {
      name: "頭目名稱",
      value: (pm: Pokemon) => pm.name,
      width: "w-4/12",
    },
    {
      name: "等級",
      value: (pm: Pokemon) => pm.level,
      width: "w-2/12",
    },
    {
      name: "出沒地點",
      value: (pm: Pokemon) => pm.nearby,
      width: "w-6/12",
    },
  ];

  const filterModel = useFilter("黑曜原野");

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom pmList={pmList} />
      </div>
      <div className="w-full max-h-screen">
        <div className="overflow-y-auto p-4">
          <div className="mb-4">
            <AreaSelect
              filter={filterModel.filter}
              toggereAreaSelect={filterModel.toggereAreaSelect}
              updateAreaSelect={filterModel.updateAreaSelect}
            />
          </div>
          <Table feilds={feilds} data={pmList} />
        </div>
      </div>
    </div>
  );
}

export default Map;
