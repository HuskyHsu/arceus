import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterContextInterface, Haunt, MapData, SpawnTable } from "@/models";
import { Icon, Table } from "@/components";
import { api, BASE_URL } from "@/utils";
import { keys } from "..";

interface Props {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

const spawntableFeilds = [
  {
    name: "名稱",
    value: (haunt: Haunt) => {
      return haunt.alpha ? (
        <Link to={`/${haunt.link}`}>
          <span className={" text-blue-900 underline inline"}>
            {haunt.name}
            <Icon.Boss className="h-[1.3rem] w-[1.3rem] inline ml-1" />
          </span>
        </Link>
      ) : (
        <Link to={`/${haunt.link}`} className="text-blue-900 underline">
          {haunt.name}
        </Link>
      );
    },
    width: "w-4/12",
  },
  {
    name: "機率",
    value: (haunt: Haunt) => {
      return `${haunt["%"]}%`;
    },
    width: "w-4/12",
  },
  {
    name: "等級",
    value: (haunt: Haunt) => {
      return haunt.level;
    },
    width: "w-4/12",
  },
];

const getSpawntable = async (id: string) => {
  return await api<SpawnTable[]>(`${BASE_URL}data/map/spawntable/${id}.json`);
};

export function Spawntables({ mapData, filterModel }: Props) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  if (keywordInfo.length === 0 || keywordInfo[0] === "boss") {
    return <></>;
  }

  const [spawntables, setSpawntables] = useState<SpawnTable[]>([]);

  useEffect(() => {
    (async () => {
      let tableId = null;
      const keywordInfo = filterModel.filter.keyword.split("-");
      if (keys.checkKeywordType(keywordInfo[0]) === "spawntables") {
        tableId = keywordInfo[1];
      } else if (keywordInfo[0] === "pokemon") {
        if (keywordInfo.length === 3 && spawntables.length > 0) {
          return;
        }
        const link = keywordInfo[1];
        if (keywordInfo.length === 3) {
          tableId = keywordInfo[2];
        } else {
          if ((mapData.pmTable[link]?.length ?? 0) === 0) {
            return;
          }
          tableId = String(mapData.pmTable[link][0]);
        }

        if (keywordInfo.length === 2) {
          filterModel.updateKeywordFilter([...keywordInfo, tableId].join("-"));
        }
      } else {
        return;
      }
      const data = await getSpawntable(tableId);
      setSpawntables(data);
    })();
  }, [filterModel.filter.keyword]);

  let link = "";
  if (keywordInfo[0] === "pokemon") {
    link = keywordInfo[1];
  }

  return (
    <>
      {spawntables.map((spawntable) => {
        const selectIndex = spawntable.data.findIndex(
          (row) => row.link === link
        );

        return (
          <div key={spawntable.condition}>
            <h4 className="text-lg">{spawntable.condition}</h4>
            <Table
              feilds={spawntableFeilds}
              data={spawntable.data}
              selectIndex={selectIndex}
              clickFn={(i: number) => {
                filterModel.updateKeywordFilter(
                  [
                    "pokemon",
                    spawntable.data[i].link,
                    keys.checkKeywordType(keywordInfo[0]) === "spawntables"
                      ? keywordInfo[1]
                      : keywordInfo[2],
                  ].join("-")
                );
              }}
            />
          </div>
        );
      })}
    </>
  );
}
