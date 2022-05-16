import { MapProps } from "@/models";
import { BASE_URL } from "@/utils";
import * as Maps from "./Maps";

export function MapDom({ mapData, filter, updateKeywordFilter }: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover overflow-clip"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${filter.area}_LA.png)`,
        height: "100vmin",
      }}>
      <Maps.Points
        mapData={mapData}
        filter={filter}
        type={"respawn"}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Points
        mapData={mapData}
        filter={filter}
        type={"tree"}
        color={"bg-emerald-300/50 border-emerald-600"}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Boss
        mapData={mapData}
        filter={filter}
        type={"boss"}
        updateKeywordFilter={updateKeywordFilter}
      />
    </div>
  );
}
