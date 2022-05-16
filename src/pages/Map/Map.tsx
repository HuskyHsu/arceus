import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Icon } from "@/components";
import { useFilter } from "@/utils";
import { FilterContextInterface } from "@/models";

import { AreaSelect, MapDom, Tables, useMapData } from "./components";

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

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const area = searchParams.get("area") ?? "黑曜原野";
  const keyword = searchParams.get("keyword") ?? "";
  const displayTypes = {
    respawn: true,
    tree: true,
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

  const displayTable = filterModel.filter.keyword.startsWith("boss")
    ? "boss"
    : "spawntables";

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
          <Header filterModel={filterModel} />
          {displayTable === "boss" ? (
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
          ) : (
            <div className="grid gap-y-4">
              <Tables.Spawntables
                spawntables={spawntables}
                filterModel={filterModel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
