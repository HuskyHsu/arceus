import { Table } from "@/components";
import { FilterContextInterface, MapData, MultiPoint } from "@/models";
import { BASE_URL } from "@/utils";
import { keys } from "..";

interface Props {
  filterModel: FilterContextInterface;
  mapData: MapData;
}

export function Unown({ filterModel, mapData }: Props) {
  if (!filterModel.filter.keyword.startsWith("unown-")) {
    return <></>;
  }

  const feilds = [
    {
      name: "樣子",
      value: (points: MultiPoint) => (points.attr ?? "").toUpperCase(),
      width: "w-6/12",
    },
    {
      name: "圖片",
      value: (points: MultiPoint) => {
        let imgUrl = `${BASE_URL}image/pokemon/201${points.attr}.png`;
        if (points.attr === "a") {
          imgUrl = `${BASE_URL}image/pokemon/201.png`;
        } else if (points.attr === "!") {
          imgUrl = `${BASE_URL}image/pokemon/201EX.png`;
        } else if (points.attr === "?") {
          imgUrl = `${BASE_URL}image/pokemon/201QU.png`;
        }
        return <img src={imgUrl} alt={points.attr} className="h-20 w-20" />;
      },
      width: "w-6/12",
    },
  ];

  const keywordInfo = filterModel.filter.keyword.split("-");
  const selectIndex = mapData.unown.findIndex(
    (points) => points.attr === keywordInfo[1]
  );

  return (
    <Table
      feilds={feilds}
      data={mapData.unown}
      selectIndex={selectIndex}
      clickFn={(i: number) => {
        const keyword = keys.getPointKey("unown", mapData.unown[i].attr ?? "");
        filterModel.updateKeywordFilter(keyword);
      }}
    />
  );
}
