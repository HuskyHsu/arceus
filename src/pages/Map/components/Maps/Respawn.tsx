import clsx from "clsx";
import { MapProps } from "@/models";

export function getRespawnKey(id: number) {
  return `respawn-${id}`;
}

export function Respawn({ mapData, filter, updateKeywordFilter }: MapProps) {
  if (!filter.types.respawn) {
    return <></>;
  }

  return (
    <>
      <svg className="absolute w-full h-full" viewBox="0 0 1000 1000">
        {mapData.respawn.map((respawn, i) => {
          const keyword = getRespawnKey(respawn.id);
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
        const keyword = getRespawnKey(respawn.id);
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
