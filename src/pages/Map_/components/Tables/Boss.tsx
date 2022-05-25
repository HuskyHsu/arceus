import { Link } from "react-router-dom";

import { Icon, Table } from "@/components";
import { BossPokemon, FilterContextInterface } from "@/models";
import { Types } from "./Types";

interface Props {
  pokemonList: BossPokemon[];
  filterModel: FilterContextInterface;
}

export function Boss({ pokemonList, filterModel }: Props) {
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

  let selectIndex = -1;
  if (filterModel.filter.keyword.startsWith("boss-")) {
    selectIndex = Number(filterModel.filter.keyword.split("-")[1]);
  }

  return (
    <Table
      feilds={feilds}
      data={pokemonList}
      selectIndex={selectIndex}
      clickFn={(i: number) => {
        filterModel.updateKeywordFilter("");
      }}
    />
  );
}
