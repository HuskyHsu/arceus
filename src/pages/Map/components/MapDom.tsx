import { useEffect } from "react";
import clsx from "clsx";

import { BossPokemon, Filter, MapData, SpawnTable } from "@/models";
import { api, BASE_URL } from "@/utils";
import { Marker } from "./Marker";

interface BaseProps {
  mapData: MapData;
  filter: Filter;
  updateKeywordFilter: Function;
}

interface MapProps {
  // pmList: BossPokemon[];
  mapData: MapData;
  filter: Filter;
  updateKeywordFilter: Function;
}

interface BossProps {
  pmList: BossPokemon[];
  filter: Filter;
  updateKeywordFilter: Function;
}

function BossMap({ pmList, filter, updateKeywordFilter }: BossProps) {
  if (!filter.types.boss) {
    return <></>;
  }
  return (
    <>
      {pmList.map((pm, i) => {
        return (
          <Marker
            key={i}
            pm={pm}
            selected={filter.keyword === String(i)}
            updateKeywordFilter={() => {
              updateKeywordFilter(String(i));
            }}
          />
        );
      })}
    </>
  );
}

function RespawnMap({ mapData, filter, updateKeywordFilter }: BaseProps) {
  if (!filter.types.respawn) {
    return <></>;
  }

  return (
    <>
      <svg className="absolute w-full h-full" viewBox="0 0 1000 1000">
        {mapData.respawn.map((respawn, i) => {
          const keyword = `respawn-${respawn.id}`;
          const selected = filter.keyword === keyword;
          if (!selected) {
            return;
          }
          if (respawn.points.length < 2) {
            return;
          }
          if (respawn.points.length === 2) {
            return (
              <line
                key={i}
                x1={respawn.points[0][0]}
                y1={respawn.points[0][1]}
                x2={respawn.points[1][0]}
                y2={respawn.points[1][1]}
                className="stroke-red-400 stroke-[4px]"
              />
            );
          }
          return (
            <polygon
              key={i}
              className="fill-red-500/20 stroke-red-400"
              points={respawn.convexHull
                ?.map((i) => {
                  return `${respawn.points[i][0]} ${respawn.points[i][1]}`;
                })
                .join(",")}
            />
          );
        })}
      </svg>
      {mapData.respawn.map((respawn, i) => {
        const keyword = `respawn-${respawn.id}`;
        const selected = filter.keyword === keyword;
        return (
          <div
            key={i}
            onClick={() => {
              updateKeywordFilter(keyword);
            }}>
            {respawn.points.map((point, j) => (
              <button
                key={j}
                className={clsx(
                  "flex flex-col justify-center items-center w-3 h-3",
                  "absolute -translate-y-2/4 -translate-x-2/4",
                  "bg-yellow-300/50 border-[1px] border-yellow-600 rounded-full"
                )}
                style={{
                  top: `${point[1] / 10}%`,
                  left: `${point[0] / 10}%`,
                }}>
                {selected && (
                  <p
                    className={clsx(
                      "absolute w-3 h-3 rounded-full bg-white",
                      "animate-ping"
                    )}></p>
                )}
              </button>
            ))}
          </div>
        );
      })}
    </>
  );
}

export function MapDom({
  // pmList,
  mapData,
  filter,
  updateKeywordFilter,
}: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover overflow-clip"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${filter.area}_LA.png)`,
        height: "100vmin",
      }}>
      <RespawnMap
        mapData={mapData}
        filter={filter}
        updateKeywordFilter={updateKeywordFilter}
      />
      {/* <BossMap
        pmList={pmList}
        filter={filter}
        updateKeywordFilter={updateKeywordFilter}
      /> */}
    </div>
  );
}
