import { Link } from "react-router-dom";

import { Icon, Table } from "@/components";
import { BossPokemon, FilterContextInterface } from "@/models";
import { Types } from "./Types";
import { keys } from "..";

interface Props {
  pokemonList: BossPokemon[];
  filterModel: FilterContextInterface;
}

export function Boss({ pokemonList, filterModel }: Props) {
  if (!filterModel.filter.keyword.startsWith("boss-")) {
    if (filterModel.filter.keyword.split("-").length === 3) {
      return <></>;
    }
  }

  const feilds = [
    {
      name: (
        <span className={"flex gap-x-2"}>
          <Icon.Boss className="h-[1.3rem] w-[1.3rem]" />
          頭目名稱
        </span>
      ),
      value: (pm: BossPokemon) => (
        <Link to={`/${pm.link}`}>
          <span className={" text-blue-900 underline w-fix inline"}>
            <Icon.Boss className="h-[1.3rem] w-[1.3rem] inline mr-1" />
            {pm.name}
          </span>
        </Link>
      ),
      width: "w-4/12",
    },
    {
      name: "屬性",
      value: (pm: BossPokemon) => <Types pm={pm} />,
      width: "w-3/12",
    },
    {
      name: "等級",
      value: (pm: BossPokemon) => pm.level,
      width: "w-2/12",
    },
    {
      name: "出沒時間",
      value: (pm: BossPokemon) => pm.time,
      width: "w-3/12",
    },
  ];

  const keywordInfo = filterModel.filter.keyword.split("-");

  const selectIndex = pokemonList.map((pm) => pm.link).indexOf(keywordInfo[1]);

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
