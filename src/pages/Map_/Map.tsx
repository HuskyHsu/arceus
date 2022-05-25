import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

import { BasePokemon, FilterContextInterface, MapNewProps } from "@/models";
import { BASE_URL, useFilter } from "@/utils";
import { AreaSelect, BossMarker, useMapData } from "./components";
import { Link } from "react-router-dom";
import { Icon } from "@/components";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface Props {
  filterModel: FilterContextInterface;
}

interface Layer {
  children: JSX.Element;
  filterModel: FilterContextInterface;
  name: string;
  type: string;
}

function LayerMap({ children, filterModel, name, type }: Layer) {
  return (
    <LayersControl.Overlay name={name} checked={filterModel.filter.types[type]}>
      <LayerGroup
        eventHandlers={{
          add: () => {
            if (!filterModel.filter.types[type]) {
              filterModel.toggereTypeSelect(type);
            }
          },
          remove: () => {
            if (filterModel.filter.types[type]) {
              filterModel.toggereTypeSelect(type);
            }
          },
        }}>
        {children}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

function MapDom({ mapData, filterModel }: MapNewProps) {
  const isMobile = window.screen.width < 768;
  return (
    <MapContainer
      center={[512, 512]}
      zoom={isMobile ? -1.5 : -0.5}
      maxBounds={[
        [0, 0],
        [1024, 1024],
      ]}
      crs={CRS.Simple}
      minZoom={isMobile ? -2 : -1}
      maxZoom={2}
      zoomSnap={0.5}
      zoomDelta={0.5}
      wheelPxPerZoomLevel={120}
      preferCanvas={true}
      className="h-full w-full">
      <ImageOverlay
        url={`${BASE_URL}image/map/${filterModel.filter.area}_LA.png`}
        bounds={[
          [0, 0],
          [1024, 1024],
        ]}
      />
      <LayersControl position="topright" collapsed={false}>
        <LayerMap filterModel={filterModel} name={"定點頭目"} type={"boss"}>
          <>
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
          </>
        </LayerMap>
        <LayerMap filterModel={filterModel} name={"重生點"} type={"respawn"}>
          <></>
        </LayerMap>
        <LayerMap filterModel={filterModel} name={"搖晃的樹"} type={"tree"}>
          <></>
        </LayerMap>
        <LayerMap filterModel={filterModel} name={"搖晃的礦"} type={"crystal"}>
          <></>
        </LayerMap>
      </LayersControl>
    </MapContainer>
  );
}

function Header({ filterModel }: Props) {
  return (
    <div className="mb-4 flex gap-x-4">
      <Link to="/" className="bg-white rounded-full p-1 shadow-md">
        <Icon.Table className="h-6 w-6" />
      </Link>
      <AreaSelect
        filter={filterModel.filter}
        toggereAreaSelect={filterModel.toggereAreaSelect}
        updateAreaSelect={filterModel.updateAreaSelect}
      />
    </div>
  );
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
      <div className="col-span-12 md:col-span-6 h-full">
        <MapDom mapData={mapData} filterModel={filterModel}></MapDom>
      </div>
      <div className="col-span-12 md:col-span-6 h-full p-4">
        <Header filterModel={filterModel} />
        {Object.entries(filterModel.filter.types)
          .map(([key, value]) => `${key}-${value}`)
          .join("\n")}
      </div>
    </div>
  );
}

export default Map_;