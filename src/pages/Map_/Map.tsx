import { useEffect } from "react";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import { BasePokemon, FilterContextInterface } from "@/models";
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

  const params = document.location.href.split("?");
  let paramsString = "";
  if (params.length > 1) {
    paramsString = params[1];
  }
  let searchParams = new URLSearchParams(paramsString);

  const area = searchParams.get("area") ?? "黑曜原野";
  const keyword = searchParams.get("keyword") ?? "";

  const displayTypes = {
    respawn: true,
    tree: true,
    crystal: true,
    boss: true,
  };

  const filterModel = useFilter(area, displayTypes, keyword);

  const { mapData } = useMapData(
    filterModel.filter,
    filterModel.updateKeywordFilter
  );

  useEffect(() => {
    searchParams.set("area", filterModel.filter.area);
    searchParams.set("keyword", filterModel.filter.keyword);

    window.location.href =
      document.location.href.split("?")[0] + "?" + searchParams.toString();
  }, [filterModel.filter.area, filterModel.filter.keyword]);

  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-12 md:col-span-3 h-full">
        {filterModel.filter.keyword}
      </div>
      <div className="col-span-12 md:col-span-6 h-full">
        <Maps.MapDom mapData={mapData} filterModel={filterModel}></Maps.MapDom>
      </div>
      <div className="col-span-12 md:col-span-3 h-full w-full p-4">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full grow-0 h-12">
            <Header filterModel={filterModel} />
          </div>
          <div className="w-full grow h-20 overflow-y-auto">
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
            <Tables.Spawntables mapData={mapData} filterModel={filterModel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map_;
