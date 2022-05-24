import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import clsx from "clsx";

import { Avatars } from "@/components";
import { BossPokemon } from "@/models";

interface MarkerProps {
  pm: BossPokemon;
  updateKeywordFilter: Function;
  selected: boolean;
}

export function BossMarker({ pm, updateKeywordFilter, selected }: MarkerProps) {
  const iconMarkup = renderToStaticMarkup(
    <button
      onClick={() => {
        updateKeywordFilter();
      }}>
      <p
        className={clsx(
          "absolute w-10 h-10 rounded-full bg-white",
          selected ? "animate-ping" : "opacity-0"
        )}></p>
      <Avatars pm={pm} size={"S"} style={clsx("ring-[2px]")} />
    </button>
  );

  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return (
    <Marker
      position={[1024 - pm.point[1], pm.point[0]]}
      icon={customMarkerIcon}></Marker>
  );
}
