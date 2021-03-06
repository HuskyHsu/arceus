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
      <Link
        to={`/${
          pokemonList.length > 0
            ? pokemonList[Math.floor(pokemonList.length / 2) - 1].link
            : ""
        }`}
      >
        <Icon.Left className="h-6 w-6" />
      </Link>
      {pokemonList.map((pm) => (
        <Link
          key={pm.link}
          to={`/${pm.link}`}
          className={clsx(
            "leading-normal",
            pm.link === link ? "text-white" : "text-slate-600"
          )}
        >
          <ul className="flex flex-col items-center">
            <li>
              <Avatars
                pm={pm}
                size={"M"}
                style={pm.link === link ? "ring-[3px]" : ""}
              />
            </li>
            <li className="-m-1">{zeroFilled(pm.id)}</li>
          </ul>
        </Link>
      ))}
      <Link
        to={`/${
          pokemonList.length > 0
            ? pokemonList[Math.floor(pokemonList.length / 2) + 1].link
            : ""
        }`}
      >
        <Icon.Right className="h-6 w-6" />
      </Link>
    </>
  );
}
