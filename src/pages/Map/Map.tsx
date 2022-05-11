import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Icon, Table } from "@/components";
import { BossPokemon, MapData } from "@/models";
import { api, BASE_URL, useFilter } from "@/utils";
import { AreaSelect, MapDom, TableList, Types } from "./components";

const useBossPokemonList = (area: string) => {
  const [pokemonList, setPokemonList] = useState<BossPokemon[]>([]);

  const getData = async (area: string) => {
    return await api<BossPokemon[]>(`${BASE_URL}data/map/${area}.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getData(area);
      setPokemonList(data);
    })();
  }, [area]);

  return { pokemonList };
};

const useMapData = () => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
  });

  const getData = async () => {
    return await api<MapData>(`${BASE_URL}data/map/cobaltcoastlands.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
      setMapData(data);
    })();
  }, []);

  return { mapData };
};

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterModel = useFilter(searchParams.get("area") ?? "黑曜原野");
  const { pokemonList } = useBossPokemonList(filterModel.filter.area);
  const { mapData } = useMapData();

  useEffect(() => {
    setSearchParams({ area: filterModel.filter.area });
  }, [filterModel.filter.area]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom
          pmList={pokemonList}
          mapData={mapData}
          filter={filterModel.filter}
          updateKeywordFilter={filterModel.updateKeywordFilter}
        />
      </div>
      <div className="w-full max-h-screen">
        <div className="max-h-screen overflow-y-auto p-4 max-w-xl">
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
          <TableList pokemonList={pokemonList} filterModel={filterModel} />
        </div>
      </div>
    </div>
  );
}

export default Map;
