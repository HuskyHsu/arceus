import { Link } from "react-router-dom";
import clsx from "clsx";

import { Avatars, Icon } from "@/components";
import { zeroFilled } from "@/utils";
import { BasePokemon } from "@/models";

interface Props {
  pokemonList: BasePokemon[];
  link: string;
}

export function QuickList({ pokemonList, link }: Props) {
  return (
    <>
      <Link to={"/"}>
        <Icon.Table className="h-6 w-6" />
      </Link>
      <Icon.Left className="h-6 w-6" />
      {pokemonList.map((pm) => (
        <Link
          key={pm.link}
          to={`/${pm.link}`}
          className={clsx("leading-normal", {
            "text-slate-600": pm.link === link,
          })}
        >
          <ul className="flex flex-col items-center">
            <li>
              <Avatars
                pm={pm}
                size={"small"}
                style={pm.link === link ? "outline outline-[3px]" : ""}
              />
            </li>
            <li className="-m-1">{zeroFilled(pm.id)}</li>
          </ul>
        </Link>
      ))}
      <Icon.Right className="h-6 w-6" />
    </>
  );
}
