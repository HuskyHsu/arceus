import { latLng } from "leaflet";
import { CircleMarker, LayerGroup, Polygon, Polyline } from "react-leaflet";

import { MapData, MapSetTypes, MultiPoint } from "@/models";

interface SphereProps {
  dataset: MultiPoint;
}

interface LayerProps {
  mapData: MapData;
  keywordInfo: string[];
}

function getTableIds(mapData: MapData, keywordInfo: string[]) {
  let tableIds: number[] = [];
  if (keywordInfo.length === 0) {
    return tableIds;
  }
  if (keywordInfo[0] === "pokemon") {
    const link = keywordInfo[1];
    if (mapData.pmTable[link]) {
      tableIds = mapData.pmTable[link];
    }
  }
  return tableIds;
}

function Sphere({ dataset }: SphereProps) {
  const strokeColor = "rgb(248, 113, 113)";
  const fillColor = "rgba(239, 68, 68, 0.4)";
  const pathOptions = {
    weight: 1,
    color: strokeColor,
    fillColor: fillColor,
    fillOpacity: 0.5,
  };

  if (dataset.points.length > 2) {
    const polygon =
      dataset.convexHull
        ?.map((i) => dataset.points[i])
        .map((point) => latLng(1024 - point[1], point[0])) ?? [];

    return <Polygon pathOptions={pathOptions} positions={polygon} />;
  } else if (dataset.points.length === 2) {
    const polyline =
      dataset.points.map((point) => latLng(1024 - point[1], point[0])) ?? [];

    return (
      <Polyline
        pathOptions={{
          weight: 3,
          color: strokeColor,
        }}
        positions={polyline}
      />
    );
  }
  return (
    <CircleMarker
      center={latLng(1024 - dataset.points[0][1], dataset.points[0][0])}
      radius={15}
      pathOptions={pathOptions}
    />
  );
}

export function LayerSphere({ mapData, keywordInfo }: LayerProps) {
  return (
    <>
      {Object.values(MapSetTypes).map((type) => {
        return mapData[type].map((dataset, i) => {
          if (keywordInfo.length < 2) {
            return;
          } else if (keywordInfo.length === 2) {
            if (keywordInfo[0] === "pokemon") {
              const tableIds = getTableIds(mapData, keywordInfo);
              if (!tableIds.includes(dataset.id)) {
                return;
              }
            } else {
              const tableId = Number(keywordInfo[1]);
              if (dataset.id !== tableId) {
                return;
              }
            }
          } else if (keywordInfo.length === 3) {
            const tableIds = getTableIds(mapData, keywordInfo);
            if (!tableIds.includes(dataset.id)) {
              return;
            }
          }

          return <Sphere key={i} dataset={dataset} />;
        });
      })}
    </>
  );
}
