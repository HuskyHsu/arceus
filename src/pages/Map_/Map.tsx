import { Link } from "react-router-dom";
import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";

import { BasePokemon, FilterContextInterface, MapNewProps } from "@/models";
import { Icon } from "@/components";
import { BASE_URL, useFilter } from "@/utils";

import { AreaSelect, BossMarker, Tables, useMapData } from "./components";
import "./index.css";

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
            {mapData.boss.map((boss, i) => {
              let selected = false;
              if (filterModel.filter.keyword.startsWith("boss-")) {
                selected =
                  boss.link === filterModel.filter.keyword.split("-")[1];
              }
              return (
                <BossMarker
                  key={i}
                  pm={boss}
                  updateKeywordFilter={() => {
                    const keyword = `boss-${boss.link}`;
                    filterModel.updateKeywordFilter(keyword);
                  }}
                  selected={selected}
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
      <div className="col-span-12 md:col-span-3 h-full">
        {filterModel.filter.keyword}
      </div>
      <div className="col-span-12 md:col-span-6 h-full">
        <MapDom mapData={mapData} filterModel={filterModel}></MapDom>
      </div>
      <div className="col-span-12 md:col-span-3 h-full p-4">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="grow-0 h-12">
            <Header filterModel={filterModel} />
          </div>
          <div className="grow h-20 overflow-y-auto">
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map_;
