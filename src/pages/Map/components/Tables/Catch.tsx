import { Link } from "react-router-dom";
import clsx from "clsx";

import { Avatars, Icon, Table } from "@/components";
import {
  BasePokemon,
  FilterContextInterface,
  MapData,
  mapPm,
  MapSetTypes,
} from "@/models";
import { BASE_URL } from "@/utils";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface SummaryPrpos extends PokemonBaseList {
  mapData: MapData;
  updateKeywordFilter: Function;
  link: string;
}

interface CountPrpos {
  mapData: MapData;
  filterModel: FilterContextInterface;
  pm?: BasePokemon;
}

interface CatchProps extends CountPrpos {
  pokemonList: BasePokemon[];
}

function Summary({
  pokemonList,
  mapData,
  link,
  updateKeywordFilter,
}: SummaryPrpos) {
  return (
    <>
      {pokemonList.map((pm) => {
        const pmInfo = mapData.pmTable[pm.link];
        return (
          <button
            key={pm.link}
            onClick={() => {
              if (pmInfo.spawntables.length > 0) {
                updateKeywordFilter(
                  ["pokemon", pm.link, pmInfo.spawntables[0]].join("-")
                );
              } else {
                updateKeywordFilter(["pokemon", pm.link].join("-"));
              }
            }}
            className={"relative"}>
            <Avatars
              pm={pm}
              size={"M"}
              style={clsx(
                pm.link === link ? "ring-[5px] ring-sky-700" : "ring-0"
              )}
              imgStyle={clsx({
                grayscale: pmInfo.spawntables.length === 0 && !pmInfo.boss,
              })}
            />
            {pmInfo.boss && (
              <Icon.Boss className="h-4 w-4 absolute top-0 right-0" />
            )}
            {pmInfo.mass && (
              <Icon.Star className="h-4 w-4 absolute bottom-0 right-0" />
            )}
            {pmInfo.massive && (
              <Icon.Stars className="h-4 w-4 absolute bottom-0 left-0" />
            )}
            {pmInfo.distortion && (
              <Icon.Distortion className="h-4 w-4 absolute top-0 left-0" />
            )}
          </button>
        );
      })}
    </>
  );
}

function Count({ pm, mapData, filterModel }: CountPrpos) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  if (
    keywordInfo[0] !== "pokemon" ||
    mapData.pmTable[keywordInfo[1]] === undefined
  ) {
    return <></>;
  }

  const targetPm = mapData.pmTable[keywordInfo[1]];
  const sphereCount = targetPm.spawntables.length;
  const pointCount = Object.values(MapSetTypes).reduce((sum, type) => {
    sum += mapData[type]
      .filter((dataset) => {
        return targetPm.spawntables.includes(dataset.id);
      })
      .reduce((subSum, dataset) => {
        return subSum + dataset.points.length;
      }, 0);
    return sum;
  }, 0);

  const feilds = [
    {
      name: "目標",
      value: (targetPm: mapPm) => {
        if (pm) {
          return (
            <Link to={`/${pm.link}`}>
              <Avatars
                pm={pm}
                size={"M"}
                style={clsx("ring-0", {
                  grayscale:
                    targetPm.spawntables.length === 0 && !targetPm.boss,
                })}
              />
            </Link>
          );
        }
      },
      width: "w-1/5",
    },
    {
      name: (
        <>
          <span className="block">定點</span>
          <span>頭目</span>
        </>
      ),
      value: (targetPm: mapPm) => (
        <Icon.Boss
          className={clsx("h-10 w-full", {
            "grayscale contrast-0": !targetPm.boss,
          })}
        />
      ),
      width: "w-1/5",
    },
    {
      name: (
        <>
          <span className="block">時空</span>
          <span>扭曲</span>
        </>
      ),
      value: () => (
        <Icon.Distortion
          className={clsx("h-10 w-full", {
            grayscale: !targetPm.distortion,
          })}
        />
      ),
      width: "w-1/5",
    },
    {
      name: (
        <>
          <span className="block">大量</span>
          <span>出現</span>
        </>
      ),
      value: () => (
        <Icon.Star
          className={clsx("h-10 w-full", {
            grayscale: !targetPm.mass,
          })}
        />
      ),
      width: "w-1/5",
    },
    {
      name: (
        <>
          <span className="block">大大大</span>
          <span>量出現</span>
        </>
      ),
      value: () => (
        <Icon.Stars
          className={clsx("h-10 w-full", {
            grayscale: !targetPm.massive,
          })}
        />
      ),
      width: "w-1/5",
    },
  ];

  const events = [
    targetPm.distortion ? "時空扭曲" : null,
    targetPm.mass ? "大量出現" : null,
    targetPm.massive ? "大大大量出現" : null,
    targetPm.event ? "任務" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-full h-full flex flex-col gap-y-1">
      <Table
        feilds={feilds}
        data={[targetPm]}
        selectIndex={0}
        clickFn={() => {}}
        headerCenter={true}
      />
      {sphereCount !== 0 || targetPm.boss ? (
        <div>
          <span>
            {sphereCount !== 0
              ? targetPm.boss
                ? `共計${sphereCount}處，${pointCount}個點位與定點頭目`
                : `共計${sphereCount}處，${pointCount}個點位有機會出沒`
              : "定點頭目固定出沒"}
          </span>
          {events !== "" && (
            <span className="block">
              ({events}
              事件中出現)
            </span>
          )}
        </div>
      ) : (
        <span>
          僅在
          {events}
          事件中
        </span>
      )}
    </div>
  );
}

export function Catch({ pokemonList, mapData, filterModel }: CatchProps) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  const matchPms = pokemonList.filter((pm) => {
    return (
      (mapData.pmTable[pm.link]?.spawntables.length ?? 0) > 0 ||
      mapData.pmTable[pm.link]?.boss ||
      mapData.pmTable[pm.link]?.mass ||
      mapData.pmTable[pm.link]?.massive ||
      mapData.pmTable[pm.link]?.distortion ||
      mapData.pmTable[pm.link]?.event
    );
  });

  return (
    <>
      <div className="w-full grow-0 flex flex-col gap-y-4">
        <div
          className={clsx(
            "w-full h-12",
            "flex items-center justify-center",
            "text-white",
            "bg-no-repeat bg-contain"
          )}
          style={{
            backgroundImage: `url(${BASE_URL}image/brush_1.png)`,
            backgroundSize: "300px 40px",
            backgroundPosition: "center",
          }}>
          可捕獲的寶可夢
        </div>
        {keywordInfo[0] === "pokemon" && (
          <div className="h-36">
            <Count
              pm={pokemonList.find((pm) => pm.link === keywordInfo[1])}
              mapData={mapData}
              filterModel={filterModel}
            />
          </div>
        )}
      </div>
      <div
        className={clsx(
          "w-full grow h-20 overflow-y-auto",
          "flex flex-wrap justify-around items-start gap-2 pt-1"
        )}>
        <Summary
          pokemonList={matchPms}
          mapData={mapData}
          link={keywordInfo[1]}
          updateKeywordFilter={filterModel.updateKeywordFilter}
        />
      </div>
    </>
  );
}
