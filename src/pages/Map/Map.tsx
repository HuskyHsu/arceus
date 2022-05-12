import { Fragment, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Icon, Table } from "@/components";
import { BossPokemon, Filter, Haunt, MapData, SpawnTable } from "@/models";
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

const useMapData = (filter: Filter) => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
  });

  const [spawntables, setSpawntables] = useState<SpawnTable[]>([]);

  const getMapData = async () => {
    return await api<MapData>(`${BASE_URL}data/map/cobaltcoastlands.json`);
  };

  const getSpawntable = async (id: string) => {
    return await api<SpawnTable[]>(`${BASE_URL}data/map/spawntable/${id}.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getMapData();
      setMapData(data);
    })();
  }, [filter.area]);

  useEffect(() => {
    (async () => {
      if (!filter.keyword.startsWith("respawn-")) {
        return;
      }
      const data = await getSpawntable(filter.keyword.split("-")[1]);
      setSpawntables(data);
    })();
  }, [filter.keyword]);

  return { mapData, spawntables };
};

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const area = searchParams.get("area") ?? "群青海岸";
  const displayTypes = {
    respawn: true,
    boss: true,
  };

  const filterModel = useFilter(area, displayTypes);

  // const { pokemonList } = useBossPokemonList(filterModel.filter.area);
  const { mapData, spawntables } = useMapData(filterModel.filter);

  useEffect(() => {
    setSearchParams({ area: filterModel.filter.area });
  }, [filterModel.filter.area]);

  const spawntableFeilds = [
    {
      name: "名稱",
      value: (haunt: Haunt) => {
        return haunt.name;
      },
      width: "w-3/12",
    },
    {
      name: "頭目",
      value: (haunt: Haunt) => {
        return haunt.alpha ? "頭目" : "一般";
      },
      width: "w-3/12",
    },
    {
      name: "機率",
      value: (haunt: Haunt) => {
        return haunt["%"];
      },
      width: "w-3/12",
    },
    {
      name: "等級",
      value: (haunt: Haunt) => {
        return haunt.level;
      },
      width: "w-3/12",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom
          // pmList={pokemonList}
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
          <div className="grid gap-y-4">
            {spawntables.map((spawntable) => {
              return (
                <div key={spawntable.condition}>
                  <h4 className="text-lg">{spawntable.condition}</h4>
                  <Table feilds={spawntableFeilds} data={spawntable.data} />
                </div>
              );
            })}
          </div>
          {/* <TableList pokemonList={pokemonList} filterModel={filterModel} /> */}
        </div>
      </div>
    </div>
  );
}

export default Map;
