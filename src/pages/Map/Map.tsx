import { useEffect } from "react";
import { Link } from "react-router-dom";

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

  const displayTable = filterModel.filter.keyword.startsWith("boss")
    ? "boss"
    : "spawntables";

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom
          mapData={mapData}
          filter={filterModel.filter}
          updateKeywordFilter={(keyword: string) => {
            filterModel.updateKeywordFilter(keyword);
          }}
        />
      </div>
      <div className="w-full max-h-screen">
        <div className="max-h-screen overflow-y-auto p-4 max-w-xl">
          <Header filterModel={filterModel} />
          {displayTable === "boss" ? (
            <Tables.Boss pokemonList={mapData.boss} filterModel={filterModel} />
          ) : (
            <div className="grid gap-y-4">
              <Tables.Spawntables mapData={mapData} filterModel={filterModel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
