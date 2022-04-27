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
    pokemon.evolution && pokemon.evolution?.length > 1
      ? pokemon.evolution?.length === 8
        ? "row-[span_8_/_span_8]"
        : "row-span-2"
      : "row-span-1";

  let keyId = 0;

  const evolutionPath = pokemon.evolution?.reduce((acc, evolution, i) => {
    let rowElement = [] as JSX.Element[];

    let secRows = "row-span-1";
    if (evolution.evolution?.length || 0 > 1) {
      secRows = "row-span-2";
    }

    if (i === 0) {
      rowElement.push(
        <div
          key={keyId}
          className={
            rows === "row-span-1" && secRows === "row-span-2"
              ? "row-span-2"
              : rows
          }>
          <Avatars pm={evolution.before} />
        </div>
      );
    }

    rowElement = rowElement.concat([
      <p
        key={keyId + 1}
        className={
          rows === "row-span-1" && secRows === "row-span-2"
            ? "row-span-2"
            : "row-span-1"
        }>
        {evolution.require}
      </p>,
      <div
        key={keyId + 2}
        className={
          rows === "row-span-1" && secRows === "row-span-2"
            ? "row-span-2"
            : "row-span-1"
        }>
        <Avatars pm={evolution.after} />
      </div>,
    ]);

    acc = acc.concat(rowElement.slice(0));
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

  return (
    <div className={clsx("grid justify-center items-center", cols)}>
      {evolutionPath}
    </div>
  );
}
