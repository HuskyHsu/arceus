import { Link } from "react-router-dom";
import { LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {
  BasePokemon,
  FilterContextInterface,
  MapData,
  MapSetTypes,
} from "@/models";
import { Icon } from "@/components";
import { useFilter } from "@/utils";

import { AreaSelect, Maps, Tables, useMapData } from "./components";
import "./index.css";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface Props {
  filterModel: FilterContextInterface;
}

interface MapProps {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

function MapDom({ mapData, filterModel }: MapProps) {
  return (
    <Maps.Base filterModel={filterModel}>
      <LayersControl position="topright" collapsed={false}>
        <Maps.LayerBoss mapData={mapData} filterModel={filterModel} />
        <Maps.LayerPoints
          mapData={mapData}
          filterModel={filterModel}
          name={"重生定點"}
          type={MapSetTypes.respawn}
          color={["rgb(202, 138, 4)", "rgb(253, 224, 71)"]}
        />
        <Maps.LayerPoints
          mapData={mapData}
          filterModel={filterModel}
          name={"搖晃的樹"}
          type={MapSetTypes.tree}
          color={["rgb(5, 150, 105)", "rgb(110, 231, 183)"]}
        />
        <Maps.LayerPoints
          mapData={mapData}
          filterModel={filterModel}
          name={"搖晃的礦"}
          type={MapSetTypes.crystal}
          color={["rgb(87, 83, 78)", "rgb(214, 211, 209)"]}
        />
      </LayersControl>
    </Maps.Base>
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
      <div className="col-span-12 md:col-span-3 h-full w-full p-4">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full grow-0 h-12">
            <Header filterModel={filterModel} />
          </div>
          <div className="w-full grow h-20 overflow-y-auto">
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map_;
