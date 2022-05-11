import { Link } from "react-router-dom";

import { Icon, Table } from "@/components";
import { BossPokemon, FilterContextInterface } from "@/models";
import { BASE_URL } from "@/utils";
import { Types } from "./Types";

interface Props {
  pokemonList: BossPokemon[];
  filterModel: FilterContextInterface;
}

export function TableList({ pokemonList, filterModel }: Props) {
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
          <p className={"flex gap-x-2"}>
            <Icon.Boss className="h-[1.3rem] w-[1.3rem]" />
            {pm.name}
          </p>
        </Link>
      ),
      width: "w-3/12",
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
      name: "出沒地點",
      value: (pm: BossPokemon) => pm.nearby,
      width: "w-4/12",
    },
  ];

  return (
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
  );
}
