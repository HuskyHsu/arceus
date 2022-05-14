import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Icon } from "@/components";
import { Filter, MapData, SpawnTable } from "@/models";
import { api, BASE_URL, useFilter } from "@/utils";
import { AreaSelect, MapDom, Tables, Maps } from "./components";

const useMapData = (filter: Filter, updateKeywordFilter: Function) => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
    boss: [],
    pmTable: {},
  });

  const [spawntables, setSpawntables] = useState<SpawnTable[]>([]);

  const getMapData = async (area: string) => {
    return await api<MapData>(`${BASE_URL}data/map/${area}.json`);
  };

  const getSpawntable = async (id: string) => {
    return await api<SpawnTable[]>(`${BASE_URL}data/map/spawntable/${id}.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getMapData(filter.area);
      setMapData(data);
      if (data.respawn.length > 0) {
        if (filter.keyword === "") {
          updateKeywordFilter(Maps.getRespawnKey(data.respawn[0].id));
        } else if (filter.keyword.startsWith("respawn-")) {
          updateKeywordFilter(Maps.getRespawnKey(data.respawn[0].id));
        } else {
          const link = filter.keyword.split("-")[1];
          if (
            data.pmTable[link] === undefined ||
            data.pmTable[link].length === 0
          ) {
            return updateKeywordFilter("");
          }
          const tableId = data.pmTable[link][0];
          const SpawntableData = await getSpawntable(`${tableId}`);
          if (filter.keyword.split("-").length === 2) {
            updateKeywordFilter(`${filter.keyword}-${tableId}`);
          }
          setSpawntables(SpawntableData);
        }
      }
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
  const area = searchParams.get("area") ?? "黑曜原野";
  const keyword = searchParams.get("keyword") ?? "";
  const displayTypes = {
    respawn: true,
    boss: true,
  };

  const filterModel = useFilter(area, displayTypes, keyword);

  const { mapData, spawntables } = useMapData(
    filterModel.filter,
    filterModel.updateKeywordFilter
  );

  useEffect(() => {
    setSearchParams({
      area: filterModel.filter.area,
      keyword: filterModel.filter.keyword,
    });
  }, [filterModel.filter.area, filterModel.filter.keyword]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom
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
          {(filterModel.filter.keyword.startsWith("respawn") ||
            filterModel.filter.keyword.startsWith("pokemon")) && (
            <div className="grid gap-y-4">
              <Tables.Spawntables
                spawntables={spawntables}
                filterModel={filterModel}
              />
            </div>
          )}
          {filterModel.filter.keyword.startsWith("boss") && (
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
