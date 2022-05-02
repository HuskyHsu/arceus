import { BossPokemon, Filter } from "@/models";
import { BASE_URL } from "@/utils";
import { Marker } from "./Marker";

interface MapProps {
  pmList: BossPokemon[];
  filter: Filter;
  updateKeywordFilter: Function;
}

export function MapDom({ pmList, filter, updateKeywordFilter }: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${filter.area}_LA.png)`,
        height: "100vmin",
      }}
    >
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
