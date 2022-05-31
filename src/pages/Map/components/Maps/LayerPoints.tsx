import { renderToStaticMarkup } from "react-dom/server";
import { CircleMarker, Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import clsx from "clsx";

import {
  FilterContextInterface,
  MapData,
  MapPointTypes,
  MapSetTypes,
} from "@/models";
import { LayerBase } from "./LayerBase";
import { keys } from "..";

interface Props {
  mapData: MapData;
  type: MapSetTypes | MapPointTypes;
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
  const keywordInfo = filterModel.filter.keyword.split("-");
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
          if (dataset.attr === undefined) {
            if (keywordInfo.length === 2) {
              if (keywordInfo[0] !== "boss" && keywordInfo[0] !== "pokemon") {
                selected = Number(keywordInfo[1]) === dataset.id;
              }
            } else if (keywordInfo.length === 3) {
              selected = Number(keywordInfo[2]) === dataset.id;
            }
          } else {
            selected = dataset.attr === keywordInfo[1];
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
                  fillOpacity: 0.8,
                }}
                eventHandlers={{
                  click: () => {
                    const keyword = keys.getPointKey(
                      type,
                      dataset.attr === undefined ? dataset.id : dataset.attr
                    );
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
