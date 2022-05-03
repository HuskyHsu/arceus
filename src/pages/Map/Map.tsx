import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Icon, Table, TypeIcon } from "@/components";
import { BaseProps, BossPokemon } from "@/models";
import { api, BASE_URL, useFilter } from "@/utils";
import { AreaSelect, MapDom } from "./components";

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

function Types({ pm }: BaseProps) {
  if (pm.types.length === 1) {
    return <TypeIcon type={pm.types[0]} />;
  }
  return (
    <li className="flex gap-1">
      {
        <>
          <TypeIcon type={pm.types[0]} />
          <TypeIcon type={pm.types[1]} />
        </>
      }
    </li>
  );
}

function Map() {
  const feilds = [
    {
      name: (
        <span className={"flex gap-x-2"}>
          <Icon.Boss className="h-[1.3rem] w-[1.3rem]" />
          頭目名稱
        </span>
      ),
      value: (pm: BossPokemon) => (
        <p className={"flex gap-x-2"}>
          <Icon.Boss className="h-[1.3rem] w-[1.3rem]" />
          {pm.name}
        </p>
      ),
      width: "w-3/12",
    },
    {
      name: "屬性",
      value: (pm: BossPokemon) => <Types pm={pm} />,
      width: "w-2/12",
    },
    {
      name: "等級",
      value: (pm: BossPokemon) => pm.level,
      width: "w-1/12",
    },
    {
      name: "出沒地點",
      value: (pm: BossPokemon) => pm.nearby,
      width: "w-4/12",
    },
    {
      name: "詳細",
      value: (pm: BossPokemon) => (
        <Link to={`/${pm.link}`}>
          <img
            className="w-5 h-5"
            src={`${BASE_URL}image/pokeball.png`}
            alt=""
          />
        </Link>
      ),
      width: "w-2/12",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const filterModel = useFilter(searchParams.get("area") ?? "黑曜原野");
  const { pokemonList } = useBossPokemonList(filterModel.filter.area);

  useEffect(() => {
    setSearchParams({ area: filterModel.filter.area });
  }, [filterModel.filter.area]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="h-full w-full">
        <MapDom
          pmList={pokemonList}
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
          <Table
            feilds={feilds}
            data={pokemonList}
            selectIndex={
              filterModel.filter.keyword === ""
                ? -1
                : Number(filterModel.filter.keyword)
            }
            clickFn={(i: string) => {
              filterModel.updateKeywordFilter(i);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Map;
