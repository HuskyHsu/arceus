import { useContext } from "react";

import { PokemonContext } from "../Detail";

export function Evolution() {
  const pokemon = useContext(PokemonContext);
  return <>{JSON.stringify(pokemon.evolution)}</>;
}
