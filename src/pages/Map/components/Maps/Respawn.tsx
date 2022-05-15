import clsx from "clsx";
import { MapProps } from "@/models";

export function getRespawnKey(id: number) {
  return `respawn-${id}`;
}

function SvgMap({ mapData, filter }: MapProps) {
  let tableIds: number[] = [];
  if (filter.keyword.startsWith("pokemon-")) {
    const link = filter.keyword.split("-")[1];
    if (mapData.pmTable[link]) {
      tableIds = mapData.pmTable[link];
    }
  }

  return (
    <svg
      className="absolute w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000">
      {mapData.respawn.map((respawn, i) => {
        if (filter.keyword.startsWith("respawn-")) {
          if (filter.keyword !== getRespawnKey(respawn.id)) {
            return;
          }
        } else if (filter.keyword.startsWith("pokemon-")) {
          if (!tableIds.includes(respawn.id)) {
            return;
          }
        } else {
          return;
        }

        if (respawn.points.length < 2) {
          return (
            <circle
              key={i}
              cx={respawn.points[0][0]}
              cy={respawn.points[0][1]}
              r="20"
              className="fill-red-500/40 stroke-red-400"
            />
          );
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
            className="fill-red-500/40 stroke-red-400"
            points={respawn.convexHull
              ?.map((i) => {
                return `${respawn.points[i][0]} ${respawn.points[i][1]}`;
              })
              .join(",")}
          />
        );
      })}
    </svg>
  );
}

export function Respawn({ mapData, filter, updateKeywordFilter }: MapProps) {
  if (!filter.types.respawn) {
    return <></>;
  }

  let tableIds: number[] = [];
  let tableId = -1;
  if (filter.keyword.startsWith("pokemon-")) {
    const link = filter.keyword.split("-")[1];
    tableId = Number(filter.keyword.split("-")[2]);
    if (mapData.pmTable[link]) {
      tableIds = mapData.pmTable[link];
    }
  }

  return (
    <>
      <SvgMap
        mapData={mapData}
        filter={filter}
        updateKeywordFilter={() => {}}
      />
      {mapData.respawn.map((respawn, i) => {
        let selected = false;
        const keyword = getRespawnKey(respawn.id);
        if (filter.keyword.startsWith("respawn-")) {
          if (filter.keyword === keyword) {
            selected = true;
          }
        } else if (filter.keyword.startsWith("pokemon-")) {
          if (tableId === respawn.id) {
            selected = true;
          }
        }

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
