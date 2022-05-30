import clsx from "clsx";

import { Avatars, Icon } from "@/components";
import {
  BasePokemon,
  FilterContextInterface,
  MapData,
  MapSetTypes,
} from "@/models";
import { BASE_URL } from "@/utils";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface SummaryPrpos extends PokemonBaseList {
  mapData: MapData;
  updateKeywordFilter: Function;
  keyword: string;
}

interface CountPrpos {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

interface CatchProps extends CountPrpos {
  pokemonList: BasePokemon[];
}

function Summary({
  pokemonList,
  mapData,
  keyword,
  updateKeywordFilter,
}: SummaryPrpos) {
  const matchPms = pokemonList.filter((pm) => {
    return (
      (mapData.pmTable[pm.link]?.spawntables.length ?? 0) > 0 ||
      mapData.pmTable[pm.link]?.boss ||
      mapData.pmTable[pm.link]?.mass
    );
  });

  return (
    <>
      {matchPms.map((pm) => {
        const pmInfo = mapData.pmTable[pm.link];
        return (
          <button
            key={pm.link}
            onClick={() => {
              if (pmInfo.spawntables.length > 0) {
                updateKeywordFilter(
                  ["pokemon", pm.link, pmInfo.spawntables[0]].join("-")
                );
              } else if (pmInfo.boss) {
                updateKeywordFilter(["boss", pm.link].join("-"));
              }
            }}
            className={"relative"}>
            <Avatars
              pm={pm}
              size={"M"}
              style={clsx(
                pm.link === keyword.split("-")[1]
                  ? "ring-[5px] ring-yellow-500"
                  : "ring-0"
              )}
            />
            <div className={clsx("absolute bottom-0 right-0")}>
              {pmInfo.boss && <Icon.Boss className="h-4 w-4" />}
              {pmInfo.mass && <Icon.Stars className="h-4 w-4" />}
            </div>
          </button>
        );
      })}
    </>
  );
}

function Count({ mapData, filterModel }: CountPrpos) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  if (
    keywordInfo[0] !== "pokemon" ||
    mapData.pmTable[keywordInfo[1]] === undefined
  ) {
    return <></>;
  }

  const sphereCount = mapData.pmTable[keywordInfo[1]].spawntables.length;
  const pointCount = Object.values(MapSetTypes).reduce((sum, type) => {
    sum += mapData[type]
      .filter((dataset) => {
        return mapData.pmTable[keywordInfo[1]].spawntables.includes(dataset.id);
      })
      .reduce((subSum, dataset) => {
        return subSum + dataset.points.length;
      }, 0);
    return sum;
  }, 0);

  return (
    <h4 className="text-md text-center">
      共計{sphereCount}處，{pointCount}個點位有機會出沒
    </h4>
  );
}

export function Catch({ pokemonList, mapData, filterModel }: CatchProps) {
  return (
    <>
      <div className="w-full grow-0 h-20">
        <div
          className={clsx(
            "w-full h-12",
            "flex items-center justify-center",
            "text-white",
            "bg-no-repeat bg-contain"
          )}
          style={{
            backgroundImage: `url(${BASE_URL}image/brush_1.png)`,
            backgroundSize: "300px 30px",
            backgroundPosition: "center",
          }}>
          可捕獲的寶可夢
        </div>
        <Count mapData={mapData} filterModel={filterModel} />
      </div>
      <div
        className={clsx(
          "w-full grow h-20 overflow-y-auto",
          "flex flex-wrap justify-around items-start gap-x-2"
        )}>
        <Summary
          pokemonList={pokemonList}
          mapData={mapData}
          keyword={filterModel.filter.keyword}
          updateKeywordFilter={filterModel.updateKeywordFilter}
        />
      </div>
    </>
  );
}
