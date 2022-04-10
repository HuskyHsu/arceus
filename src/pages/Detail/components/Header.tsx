import clsx from "clsx";

import { TypeIcon } from "@/components/TypeIcon";
import { Pokemon } from "../Detail";
import { zeroFilled } from "@/utils/id";
import { bgTypeClass } from "@/utils/color";

interface Props {
  pokemon: Pokemon;
}

function Types({ pokemon }: Props) {
  if (pokemon.types.length === 0) {
    return <></>;
  }
  return (
    <ul className="flex gap-2 h-6">
      {pokemon.types.map((type) => {
        return (
          <li
            className={clsx(
              "flex gap-2 pr-2 rounded-sm items-center",
              "bg-slate-600 text-slate-100"
            )}
            key={type}
          >
            <TypeIcon type={type} className="w-6 h-6" />
            <span className="">{type}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Header({ pokemon }: Props) {
  return (
    <ul className="flex flex-col items-center gap-1">
      <li className={clsx("w-64 h-64 rounded-2xl", bgTypeClass(pokemon.types))}>
        <img
          src={
            pokemon.genderDiff ? pokemon.imgPath.gender?.m : pokemon.imgPath.g
          }
          alt=""
          className="w-full"
        />
      </li>
      <li>{pokemon.name}</li>
      <li className="text-sm leading-none">#{zeroFilled(pokemon.id)}</li>
      <li className="flex gap-1">
        <Types pokemon={pokemon} />
      </li>
    </ul>
  );
}
