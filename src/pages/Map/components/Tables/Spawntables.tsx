import { Link } from "react-router-dom";
import { FilterContextInterface, Haunt, SpawnTable } from "@/models";
import { Icon, Table } from "@/components";

interface Props {
  spawntables: SpawnTable[];
  filterModel: FilterContextInterface;
}

export function Spawntables({ spawntables, filterModel }: Props) {
  const spawntableFeilds = [
    {
      name: "名稱",
      value: (haunt: Haunt) => {
        return haunt.alpha ? (
          <Link to={`/${haunt.link}`}>
            <span className={" text-blue-900 underline inline"}>
              {haunt.name}
              <Icon.Boss className="h-[1.3rem] w-[1.3rem] inline ml-1" />
            </span>
          </Link>
        ) : (
          <Link to={`/${haunt.link}`} className="text-blue-900 underline">
            {haunt.name}
          </Link>
        );
      },
      width: "w-4/12",
    },
    {
      name: "機率",
      value: (haunt: Haunt) => {
        return `${haunt["%"]}%`;
      },
      width: "w-4/12",
    },
    {
      name: "等級",
      value: (haunt: Haunt) => {
        return haunt.level;
      },
      width: "w-4/12",
    },
  ];

  return (
    <>
      {spawntables.map((spawntable) => {
        let selectIndex = -1;
        if (filterModel.filter.keyword.startsWith("pokemon-")) {
          const link = filterModel.filter.keyword.split("-")[1];
          selectIndex = spawntable.data.findIndex((row) => row.link === link);
        }

        return (
          <div key={spawntable.condition}>
            <h4 className="text-lg">{spawntable.condition}</h4>
            <Table
              feilds={spawntableFeilds}
              data={spawntable.data}
              selectIndex={selectIndex}
              clickFn={(i: number) => {
                filterModel.updateKeywordFilter(
                  `pokemon-${spawntable.data[i].link}-${
                    filterModel.filter.keyword.startsWith("respawn")
                      ? filterModel.filter.keyword.split("-")[1]
                      : filterModel.filter.keyword.split("-")[2]
                  }`
                );
              }}
            />
          </div>
        );
      })}
    </>
  );
}
