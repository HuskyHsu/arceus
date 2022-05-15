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
      <Maps.Respawn
        mapData={mapData}
        filter={filter}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Tree
        mapData={mapData}
        filter={filter}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Boss
        mapData={mapData}
        filter={filter}
        updateKeywordFilter={updateKeywordFilter}
      />
    </div>
  );
}
