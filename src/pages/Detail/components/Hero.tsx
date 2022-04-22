import { useContext } from "react";

import { Icon } from "@/components";
import { zeroFilled } from "@/utils";
import { PokemonContext } from "../Detail";

function DisplayImage() {
  const pokemon = useContext(PokemonContext);
  return (
    <>
      <div className="min-w-min -ml-72 z-10">
        <img
          src={pokemon.genderDiff ? pokemon.imgPath.m : pokemon.imgPath.g}
          alt=""
        />
      </div>
      <ul>
        <li className="absolute flex flex-col right-0">
          <Icon.Shiny className="h-6 w-6" />
          <Icon.Male className="h-6 w-6" />
          <Icon.Female className="h-6 w-6" />
        </li>
      </ul>
    </>
  );
}

function IdString() {
  const pokemon = useContext(PokemonContext);
  return (
    <span className="absolute bottom-4 right-4 text-white text-7xl">
      #{zeroFilled(pokemon.id)}
    </span>
  );
}

export function Hero() {
  return (
    <>
      <DisplayImage />
      <IdString />
    </>
  );
}
