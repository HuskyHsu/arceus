import { useContext } from "react";
import clsx from "clsx";

import { TypeIcon } from "@/components";
import { PokemonContext } from "../Detail";

function Types() {
  const pokemon = useContext(PokemonContext);
  if (pokemon.types.length === 0) {
    return <></>;
  }
  return (
    <ul className="flex gap-2 h-6">
      {pokemon.types.map((type) => {
        return (
          <li
            className={clsx(
              "flex gap-2 pr-2 rounded items-center",
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

function Name() {
  const pokemon = useContext(PokemonContext);
  return (
    <span className="text-3xl leading-none">
      {pokemon.name}{" "}
      {pokemon.altForm && (
        <span className="text-sm text-slate-600 leading-none">
          ({pokemon.altForm})
        </span>
      )}
    </span>
  );
}

export function NameTypes() {
  return (
    <>
      <Name />
      <Types />
    </>
  );
}
