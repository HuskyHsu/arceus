import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterContextInterface, Haunt, MapData, SpawnTable } from "@/models";
import { Icon, Table } from "@/components";
import { api, BASE_URL } from "@/utils";

interface Props {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

const getSpawntable = async (id: string) => {
  return await api<SpawnTable[]>(`${BASE_URL}data/map/spawntable/${id}.json`);
};

export function Spawntables({ mapData, filterModel }: Props) {
  if (filterModel.filter.keyword == "") {
    return <></>;
  }

  const [spawntables, setSpawntables] = useState<SpawnTable[]>([]);

  useEffect(() => {
    (async () => {
      let tableId = null;
      const keyword = filterModel.filter.keyword;
      if (
        keyword.startsWith("respawn-") ||
        keyword.startsWith("tree-") ||
        keyword.startsWith("crystal-")
      ) {
        tableId = keyword.split("-")[1];
      } else if (keyword.startsWith("pokemon-")) {
        const keywordInfo = keyword.split("-");
        if (keywordInfo.length === 3) {
          return;
        }
        const link = keywordInfo[1];
        if (
          mapData.pmTable[link] === undefined ||
          mapData.pmTable[link].length === 0
        ) {
          return;
        }
        tableId = String(mapData.pmTable[link][0]);

        if (keyword.split("-").length === 2) {
          filterModel.updateKeywordFilter(`${keyword}-${tableId}`);
        }
      } else {
        return;
      }
      const data = await getSpawntable(tableId);
      setSpawntables(data);
    })();
  }, [filterModel.filter.keyword]);

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

  return (
    <>
      {spawntables.map((spawntable) => {
        let selectIndex = -1;
        if (filterModel.filter.keyword.startsWith("pokemon-")) {
          const link = filterModel.filter.keyword.split("-")[1];
          selectIndex = spawntable.data.findIndex((row) => row.link === link);
        }

        return (
          <div key={spawntable.condition}>
            <h4 className="text-lg">{spawntable.condition}</h4>
            <Table
              feilds={spawntableFeilds}
              data={spawntable.data}
              selectIndex={selectIndex}
              clickFn={(i: number) => {
                filterModel.updateKeywordFilter(
                  `pokemon-${spawntable.data[i].link}-${
                    filterModel.filter.keyword.startsWith("respawn") ||
                    filterModel.filter.keyword.startsWith("tree") ||
                    filterModel.filter.keyword.startsWith("crystal")
                      ? filterModel.filter.keyword.split("-")[1]
                      : filterModel.filter.keyword.split("-")[2]
                  }`
                );
              }}
            />
          </div>
        );
      })}
    </>
  );
}
