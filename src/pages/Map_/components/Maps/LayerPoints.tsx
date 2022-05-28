import { renderToStaticMarkup } from "react-dom/server";
import { CircleMarker, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import clsx from "clsx";

import { FilterContextInterface, MapData, MapSetTypes } from "@/models";
import { LayerBase } from "./LayerBase";
import { keys } from "..";

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
  const keyWordInfo = filterModel.filter.keyword.split("-");
  const iconMarkup = renderToStaticMarkup(
    <p
      className={clsx(
        "absolute w-5 h-5 rounded-full bg-white",
        "animate-ping"
      )}></p>
  );

  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <LayerBase filterModel={filterModel} name={name} type={type}>
      <>
        {mapData[type].map((dataset) => {
          let selected = false;
          if (keyWordInfo.length === 2) {
            selected = Number(keyWordInfo[1]) === dataset.id;
          } else if (keyWordInfo.length === 3) {
            selected = Number(keyWordInfo[2]) === dataset.id;
          }

          if (!selected) {
            return;
          }

          return dataset.points.map((point, i) => {
            return (
              <Marker
                key={i}
                position={[1024 - point[1], point[0]]}
                icon={customMarkerIcon}
              />
            );
          });
        })}
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
                eventHandlers={{
                  click: () => {
                    const keyword = keys.getPointKey(type, dataset.id);
                    filterModel.updateKeywordFilter(keyword);
                  },
                }}
              />
            );
          });
        })}
      </>
    </LayerBase>
  );
}
