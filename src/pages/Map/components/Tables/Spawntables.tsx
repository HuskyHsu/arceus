import { Link } from "react-router-dom";
import { Haunt, SpawnTable } from "@/models";
import { Icon, Table } from "@/components";

interface Props {
  spawntables: SpawnTable[];
}

export function Spawntables({ spawntables }: Props) {
  const spawntableFeilds = [
    {
      name: "名稱",
      value: (haunt: Haunt) => {
        return haunt.alpha ? (
          <Link to={`/${haunt.link}`}>
            <p className={"flex gap-x-2 text-blue-900 underline"}>
              {haunt.name}
              <Icon.Boss className="h-[1.3rem] w-[1.3rem]" />
            </p>
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
        return (
          <div key={spawntable.condition}>
            <h4 className="text-lg">{spawntable.condition}</h4>
            <Table feilds={spawntableFeilds} data={spawntable.data} />
          </div>
        );
      })}
    </>
  );
}
