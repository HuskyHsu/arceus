import { Link } from "react-router-dom";

import { Table } from "@/components";
import { EventPokemon, FilterContextInterface } from "@/models";
import { keys } from "..";

interface Props {
  pokemonList: EventPokemon[];
  filterModel: FilterContextInterface;
}

export function Event({ pokemonList, filterModel }: Props) {
  const keywordInfo = filterModel.filter.keyword.split("-");

  if (keywordInfo[0] !== "pokemon" || keywordInfo.length === 3) {
    return <></>;
  }

  const selectIndex = pokemonList.map((pm) => pm.link).indexOf(keywordInfo[1]);
  if (selectIndex < 0) {
    return <></>;
  }

  const feilds = [
    {
      name: "名稱",
      value: (pm: EventPokemon) => (
        <Link to={`/${pm.link}`}>
          <span className={" text-blue-900 underline w-fix inline"}>
            {pm.name}
          </span>
        </Link>
      ),
      width: "w-3/12",
    },
    {
      name: "等級",
      value: (pm: EventPokemon) => pm.level,
      width: "w-2/12",
    },
    {
      name: "事件",
      value: (pm: EventPokemon) => pm.attr,
      width: "w-7/12",
    },
  ];

  return (
    <Table
      feilds={feilds}
      data={pokemonList}
      selectIndex={selectIndex}
      clickFn={(i: number) => {
        const keyword = keys.getBossKey(pokemonList[i]);
        filterModel.updateKeywordFilter(keyword);
      }}
    />
  );
}
