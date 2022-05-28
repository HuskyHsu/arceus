import { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import "leaflet/dist/leaflet.css";

import {
  BasePokemon,
  FilterContextInterface,
  MapData,
  MapPm,
  MapSetTypes,
} from "@/models";
import { Avatars, Icon } from "@/components";
import { BASE_URL, useFilter } from "@/utils";

import { AreaSelect, Maps, Tables, useMapData } from "./components";
import "./index.css";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface SummaryPrpos extends PokemonBaseList {
  mapData: MapData;
  updateKeywordFilter: Function;
  keyword: string;
}

interface HeaderProps {
  filterModel: FilterContextInterface;
}

interface CountPrpos {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

function Header({ filterModel }: HeaderProps) {
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

function Summary({
  pokemonList,
  mapData,
  keyword,
  updateKeywordFilter,
}: SummaryPrpos) {
  const bossLinks = mapData.boss.map((boss) => boss.link);
  const matchPms = pokemonList.filter((pm) => {
    return (
      (mapData.pmTable[pm.link]?.length ?? 0) > 0 || bossLinks.includes(pm.link)
    );
  });

  return (
    <>
      {matchPms.map((pm) => {
        return (
          <button
            key={pm.link}
            onClick={() => {
              if (mapData.pmTable[pm.link].length > 0) {
                updateKeywordFilter(
                  ["pokemon", pm.link, mapData.pmTable[pm.link][0]].join("-")
                );
              } else {
                updateKeywordFilter(["boss", pm.link].join("-"));
              }
            }}>
            <Avatars
              pm={pm}
              size={"M"}
              style={clsx(
                "ring-[3px]",
                pm.link === keyword.split("-")[1] ? "ring-red-500" : ""
              )}
            />
          </button>
        );
      })}
    </>
  );
}

function Count({ mapData, filterModel }: CountPrpos) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  if (
    keywordInfo[0] !== "pokemon" ||
    mapData.pmTable[keywordInfo[1]] === undefined
  ) {
    return <></>;
  }

  const sphereCount = mapData.pmTable[keywordInfo[1]].length;
  const pointCount = Object.values(MapSetTypes).reduce((sum, type) => {
    sum += mapData[type]
      .filter((dataset) => {
        return mapData.pmTable[keywordInfo[1]].includes(dataset.id);
      })
      .reduce((subSum, dataset) => {
        return subSum + dataset.points.length;
      }, 0);
    return sum;
  }, 0);

  return (
    <h4 className="text-md text-center">
      共計{sphereCount}處，{pointCount}個點位有機會出沒
    </h4>
  );
}

function Map({ pokemonList }: PokemonBaseList) {
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
      <div className="col-span-12 md:col-span-3 h-full w-full p-4">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full grow-0 h-20">
            <div
              className={clsx(
                "w-full h-12",
                "flex items-center justify-center",
                "text-white",
                "bg-no-repeat bg-contain"
              )}
              style={{
                backgroundImage: `url(${BASE_URL}image/brush_1.png)`,
                backgroundSize: "350px 40px",
                backgroundPosition: "center",
              }}>
              可捕獲的寶可夢
            </div>
            <Count mapData={mapData} filterModel={filterModel} />
          </div>
          <div
            className={clsx(
              "w-full grow h-20 overflow-y-auto",
              "flex flex-wrap justify-around items-start gap-x-2"
            )}>
            <Summary
              pokemonList={pokemonList}
              mapData={mapData}
              keyword={filterModel.filter.keyword}
              updateKeywordFilter={filterModel.updateKeywordFilter}
            />
          </div>
        </div>
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

export default Map;
