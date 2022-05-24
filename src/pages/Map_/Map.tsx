import { renderToStaticMarkup } from "react-dom/server";

import { MapContainer, ImageOverlay, Marker } from "react-leaflet";
import { CRS, divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

import { BasePokemon } from "@/models";
import { BASE_URL, useFilter } from "@/utils";
import { BossMarker, useMapData } from "./components";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

function Map_({ pokemonList }: PokemonBaseList) {
  const isMobile = window.screen.width < 768;

  const displayTypes = {
    respawn: true,
    tree: true,
    crystal: true,
    boss: true,
  };

  const filterModel = useFilter("黑曜原野", displayTypes, "");

  const { mapData } = useMapData(
    filterModel.filter,
    filterModel.updateKeywordFilter
  );

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-8 h-full w-full">
        <MapContainer
          bounds={[
            [0, 0],
            [1024, 1024],
          ]}
          maxBounds={[
            [0, 0],
            [1024, 1024],
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
              [1024, 1024],
            ]}
          />
          {mapData.boss.map((boss) => {
            return (
              <BossMarker
                key={boss.link}
                pm={boss}
                updateKeywordFilter={() => {}}
                selected={false}
              />
            );
          })}
        </MapContainer>
      </div>
      <div className="col-span-4 h-full">04</div>
    </div>
  );
}

export default Map_;
