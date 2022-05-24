import {
  MapContainer,
  ImageOverlay,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

import { BasePokemon, FilterContextInterface, MapProps } from "@/models";
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

function MapDom({ mapData, filter, filterModel }: MapProps) {
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
        url={`${BASE_URL}image/map/${filter.area}_LA.png`}
        bounds={[
          [0, 0],
          [1024, 1024],
        ]}
      />
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="頭目" checked={filter.types.boss}>
          <LayerGroup
            eventHandlers={{
              add: () => {
                if (!filterModel?.filter.types["boss"]) {
                  filterModel?.toggereTypeSelect("boss");
                }
              },
              remove: () => {
                if (filterModel?.filter.types["boss"]) {
                  filterModel?.toggereTypeSelect("boss");
                }
              },
            }}>
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
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="出怪點" checked={filter.types.respawn}>
          <LayerGroup
            eventHandlers={{
              add: () => {
                if (!filterModel?.filter.types["respawn"]) {
                  filterModel?.toggereTypeSelect("respawn");
                }
              },
              remove: () => {
                if (filterModel?.filter.types["respawn"]) {
                  filterModel?.toggereTypeSelect("respawn");
                }
              },
            }}></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="搖樹" checked={filter.types.tree}>
          <LayerGroup
            eventHandlers={{
              add: () => {
                if (!filterModel?.filter.types["tree"]) {
                  filterModel?.toggereTypeSelect("tree");
                }
              },
              remove: () => {
                if (filterModel?.filter.types["tree"]) {
                  filterModel?.toggereTypeSelect("tree");
                }
              },
            }}></LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="敲礦" checked={filter.types.crystal}>
          <LayerGroup
            eventHandlers={{
              add: () => {
                if (!filterModel?.filter.types["crystal"]) {
                  filterModel?.toggereTypeSelect("crystal");
                }
              },
              remove: () => {
                if (filterModel?.filter.types["crystal"]) {
                  filterModel?.toggereTypeSelect("crystal");
                }
              },
            }}></LayerGroup>
        </LayersControl.Overlay>
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
        <MapDom
          mapData={mapData}
          filter={filterModel.filter}
          updateKeywordFilter={filterModel.updateKeywordFilter}
          filterModel={filterModel}></MapDom>
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
