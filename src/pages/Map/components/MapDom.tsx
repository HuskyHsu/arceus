import { BossPokemon, Filter, MapData } from "@/models";
import { BASE_URL } from "@/utils";
import { Marker } from "./Marker";

interface MapProps {
  pmList: BossPokemon[];
  mapData: MapData;
  filter: Filter;
  updateKeywordFilter: Function;
}

export function MapDom({
  pmList,
  mapData,
  filter,
  updateKeywordFilter,
}: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${filter.area}_LA.png)`,
        height: "100vmin",
      }}>
      <svg className="absolute w-full h-full" viewBox="0 0 1000 1000">
        {mapData.respawn.map((respawn, i) => {
          return (
            <g key={i} className="fill-yellow-300/50 stroke-yellow-600">
              {respawn.points.map((point, j) => (
                <circle key={j} cx={point[0]} cy={point[1]} r="6" />
              ))}
            </g>
          );
        })}
      </svg>
      {pmList.map((pm, i) => {
        return (
          <Marker
            key={i}
            pm={pm}
            selected={filter.keyword === String(i)}
            updateKeywordFilter={() => {
              updateKeywordFilter(String(i));
            }}
          />
        );
      })}
    </div>
  );
}
