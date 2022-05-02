import { BossPokemon } from "@/models";
import { BASE_URL } from "@/utils";
import { Marker } from "./Marker";

interface MapProps {
  pmList: BossPokemon[];
  area: string;
}

export function MapDom({ pmList, area }: MapProps) {
  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${area}_LA.png)`,
        height: "100vmin",
      }}
    >
      {pmList.map((pm, i) => {
        return <Marker key={i} pm={pm} />;
      })}
    </div>
  );
}
