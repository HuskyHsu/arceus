import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

import { BasePokemon } from "@/models";
import { BASE_URL } from "@/utils";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

function MyComponent() {
  const map = useMap();
  console.log("map center:", map.getCenter());
  map.fitBounds([
    [0, 0],
    [1000, 1000],
  ]);
  return null;
}

function Map_({ pokemonList }: PokemonBaseList) {
  const isMobile = window.screen.width < 768;

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-8 bg-slate-100 h-full w-full">
        <MapContainer
          bounds={[
            [0, 0],
            [1000, 1000],
          ]}
          crs={CRS.Simple}
          className="h-full w-full">
          <ImageOverlay
            url={`${BASE_URL}image/map/黑曜原野_LA.png`}
            bounds={[
              [0, 0],
              [1000, 1000],
            ]}
          />
        </MapContainer>
      </div>
      <div className="col-span-4 h-full">04</div>
    </div>
  );
}

export default Map_;
