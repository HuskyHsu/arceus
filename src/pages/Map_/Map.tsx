import { MapContainer, ImageOverlay, Marker } from "react-leaflet";
import clsx from "clsx";
import { CRS, icon, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

import { BasePokemon } from "@/models";
import { BASE_URL, bgTypeClass } from "@/utils";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

function Map_({ pokemonList }: PokemonBaseList) {
  const isMobile = window.screen.width < 768;
  const pmIcon = icon({
    iconUrl: `${BASE_URL}image/icon/143.png`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    className: clsx("ring-white", "rounded-full ring-2", bgTypeClass(["一般"])),
  });

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-8 h-full w-full">
        <MapContainer
          bounds={[
            [0, 0],
            [1000, 1000],
          ]}
          crs={CRS.Simple}
          minZoom={-1}
          maxZoom={2}
          zoomSnap={0.5}
          zoomDelta={0.5}
          wheelPxPerZoomLevel={120}
          preferCanvas={true}
          className="h-full w-full">
          <ImageOverlay
            url={`${BASE_URL}image/map/黑曜原野_LA.png`}
            bounds={[
              [0, 0],
              [1000, 1000],
            ]}
          />
          <Marker position={[500, 500]} icon={pmIcon}></Marker>
        </MapContainer>
      </div>
      <div className="col-span-4 h-full">04</div>
    </div>
  );
}

export default Map_;
