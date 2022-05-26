import { CircleMarker } from "react-leaflet";

import { FilterContextInterface, MapData, MapSetTypes } from "@/models";
import { LayerBase } from "./LayerBase";

interface Props {
  mapData: MapData;
  type: MapSetTypes;
  name: string;
  color: string[];
  filterModel: FilterContextInterface;
}

export function LayerPoints({
  mapData,
  filterModel,
  name,
  type,
  color,
}: Props) {
  return (
    <LayerBase filterModel={filterModel} name={name} type={type}>
      <>
        {mapData[type].map((dataset) => {
          return dataset.points.map((point, i) => {
            return (
              <CircleMarker
                key={i}
                center={[1024 - point[1], point[0]]}
                radius={6}
                pathOptions={{
                  weight: 1,
                  color: color[0],
                  fillColor: color[1],
                  fillOpacity: 0.5,
                }}
              />
            );
          });
        })}
      </>
    </LayerBase>
  );
}
