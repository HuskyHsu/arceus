import clsx from "clsx";
import { MapData, MapProps, MultiPoint } from "@/models";

interface MapButtonProps {
  point: number[];
  selected: boolean;
}

interface MultiPointProps {
  multiPoint: MultiPoint;
}

export function getKey(key: string, id: number) {
  return `${key}-${id}`;
}

function getTableId(keyword: string) {
  let tableId = -1;
  if (keyword.startsWith("pokemon-")) {
    const keywordInfo = keyword.split("-");
    if (keywordInfo.length > 2) {
      tableId = Number(keywordInfo[2]);
    }
  }
  return tableId;
}

function getTableIds(mapData: MapData, keyword: string) {
  let tableIds: number[] = [];
  if (keyword.startsWith("pokemon-")) {
    const link = keyword.split("-")[1];
    if (mapData.pmTable[link]) {
      tableIds = mapData.pmTable[link];
    }
  }
  return tableIds;
}

function SvgMap({ mapData, type = "", filter }: MapProps) {
  let tableIds = getTableIds(mapData, filter.keyword);
  const dataset = mapData[type as keyof MapData] as MultiPoint[];

  function pass(multiPoint: MultiPoint) {
    if (filter.keyword.startsWith(`${type}-`)) {
      if (filter.keyword !== getKey(type, multiPoint.id)) {
        return true;
      }
    } else if (filter.keyword.startsWith("pokemon-")) {
      if (!tableIds.includes(multiPoint.id)) {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }

  function Circle({ multiPoint }: MultiPointProps) {
    return (
      <circle
        cx={multiPoint.points[0][0] - 8}
        cy={multiPoint.points[0][1] - 8}
        r="20"
        className="fill-red-500/40 stroke-red-400"
      />
    );
  }

  function Line({ multiPoint }: MultiPointProps) {
    return (
      <line
        x1={multiPoint.points[0][0] - 8}
        y1={multiPoint.points[0][1] - 8}
        x2={multiPoint.points[1][0] - 8}
        y2={multiPoint.points[1][1] - 8}
        className="stroke-red-400 stroke-[4px]"
      />
    );
  }

  function Polygon({ multiPoint }: MultiPointProps) {
    return (
      <polygon
        className="fill-red-500/40 stroke-red-400"
        points={multiPoint.convexHull
          ?.map((i) => {
            return `${multiPoint.points[i][0] - 8} ${
              multiPoint.points[i][1] - 8
            }`;
          })
          .join(",")}
      />
    );
  }

  return (
    <svg
      className="absolute w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000">
      {dataset.map((multiPoint, i) => {
        if (pass(multiPoint)) {
          return;
        }

        if (multiPoint.points.length < 2) {
          return <Circle multiPoint={multiPoint} key={i} />;
        }
        if (multiPoint.points.length === 2) {
          return <Line multiPoint={multiPoint} key={i} />;
        }
        return <Polygon multiPoint={multiPoint} key={i} />;
      })}
    </svg>
  );
}

function DomMap({
  mapData,
  type = "",
  color = "",
  filter,
  updateKeywordFilter,
}: MapProps) {
  const tableId = getTableId(filter.keyword);
  const dataset = mapData[type as keyof MapData] as MultiPoint[];

  function isSelected(multiPoint: MultiPoint, keyword: string) {
    let selected = false;
    if (filter.keyword.startsWith(`${type}-`)) {
      if (filter.keyword === keyword) {
        selected = true;
      }
    } else if (filter.keyword.startsWith("pokemon-")) {
      if (tableId === multiPoint.id) {
        selected = true;
      }
    }
    return selected;
  }

  function AnimatePoint() {
    return (
      <p
        className={clsx(
          "absolute w-3 h-3 rounded-full bg-white",
          "animate-ping"
        )}></p>
    );
  }

  function MapButton({ point, selected }: MapButtonProps) {
    return (
      <button
        className={clsx(
          "flex flex-col justify-center items-center w-3 h-3",
          "absolute -translate-y-full -translate-x-full",
          "border-[1px] rounded-full",
          color
        )}
        style={{
          top: `${point[1] / 10}%`,
          left: `${point[0] / 10}%`,
        }}>
        {selected && <AnimatePoint />}
      </button>
    );
  }

  return (
    <>
      {dataset.map((multiPoint, i) => {
        const keyword = getKey(type, multiPoint.id);
        const selected = isSelected(multiPoint, keyword);

        return (
          <div
            key={i}
            onClick={() => {
              updateKeywordFilter(keyword);
            }}>
            {multiPoint.points.map((point, j) => (
              <MapButton key={j} point={point} selected={selected} />
            ))}
          </div>
        );
      })}
    </>
  );
}

export function Points({
  mapData,
  type,
  filter,
  color = "bg-yellow-300/50 border-yellow-600",
  updateKeywordFilter,
}: MapProps) {
  if (!filter.types[type as string]) {
    return <></>;
  }

  return (
    <>
      <SvgMap
        mapData={mapData}
        filter={filter}
        type={type}
        color={color}
        updateKeywordFilter={() => {}}
      />
      <DomMap
        mapData={mapData}
        filter={filter}
        type={type}
        color={color}
        updateKeywordFilter={updateKeywordFilter}
      />
    </>
  );
}
