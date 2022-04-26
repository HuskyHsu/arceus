import { useContext } from "react";

import { Avatars } from "@/components";
import { PokemonContext } from "../Detail";
import clsx from "clsx";

export function Evolution() {
  const pokemon = useContext(PokemonContext);
  // 1-1
  // 1-1-1
  // 1-2-2
  // 1-8
  // 1-2
  // 1-1-2

  const cols = pokemon.evolution?.find((evolution) => evolution.evolution)
    ? "grid-cols-5"
    : "grid-cols-3";

  let rows =
    pokemon.evolution && pokemon.evolution.length > 1
      ? "row-span-2"
      : "row-span-1";

  let keyId = 0;

  const evolutionPath = pokemon.evolution?.reduce((acc, evolution, i) => {
    let rows_ = "";
    if (rows === "row-span-1") {
      rows_ =
        evolution.evolution && evolution.evolution.length > 1
          ? "row-span-2"
          : "row-span-1";
    }

    acc = acc.concat([
      <div key={keyId} className={rows_}>
        <Avatars pm={evolution.before} />
      </div>,
      <p key={keyId + 1} className={rows_}>
        {evolution.require}
      </p>,
      <div key={keyId + 2} className={rows_}>
        <Avatars pm={evolution.after} />
      </div>,
    ]);
    keyId += 3;
    if (evolution.evolution) {
      evolution.evolution.forEach((evolution_, j) => {
        acc = acc.concat([
          <p key={keyId}>{evolution_.require}</p>,
          <Avatars key={keyId + 1} pm={evolution_.after} />,
        ]);
        keyId += 2;
      });
    }
    return acc;
  }, [] as JSX.Element[]);

  return <div className={clsx("grid", cols)}>{evolutionPath}</div>;
}
