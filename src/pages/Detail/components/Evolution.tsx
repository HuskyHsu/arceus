import { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { BasePokemon } from "@/models";
import { Avatars, Icon } from "@/components";
import { PokemonContext } from "../Detail";

interface InfoProps {
  text: string;
  className: string;
}

interface AvatarsProps {
  pm: BasePokemon;
  className: string;
}

function Info({ text, className }: InfoProps) {
  return (
    <div
      className={clsx(
        className,
        "text-center flex flex-col justify-center items-center"
      )}
    >
      <Icon.Forward className={clsx("w-full", "fill-slate-600")} />
      <span className={clsx("text-sm")}>{text}</span>
    </div>
  );
}

function PokemonAvatars({ pm, className }: AvatarsProps) {
  return (
    <div
      className={clsx(className, "flex flex-col justify-center items-center")}
    >
      <Avatars pm={pm} />
      <span>{pm.name}</span>
    </div>
  );
}

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
    if ((evolution.evolution?.length || 0) > 1) {
      secRows = "row-span-2";
    }

    if (i === 0) {
      rowElement.push(
        <Link to={`/${evolution.before.link}`}>
          <PokemonAvatars
            key={keyId}
            className={
              rows === "row-span-1" && secRows === "row-span-2"
                ? "row-span-2"
                : rows
            }
            pm={evolution.before}
          />
        </Link>
      );
    }

    rowElement = rowElement.concat([
      <Info
        key={keyId + 1}
        className={
          rows === "row-span-1" && secRows === "row-span-2"
            ? "row-span-2"
            : "row-span-1"
        }
        text={evolution.require}
      />,
      <Link to={`/${evolution.after.link}`}>
        <PokemonAvatars
          key={keyId + 2}
          className={
            rows === "row-span-1" && secRows === "row-span-2"
              ? "row-span-2"
              : "row-span-1"
          }
          pm={evolution.after}
        />
      </Link>,
    ]);

    acc = acc.concat(rowElement.slice(0));
    keyId += 3;
    if (evolution.evolution) {
      evolution.evolution.forEach((evolution_, j) => {
        acc = acc.concat([
          <Info key={keyId} className={""} text={evolution_.require} />,
          <Link to={`/${evolution_.after.link}`}>
            <PokemonAvatars
              key={keyId + 1}
              className={""}
              pm={evolution_.after}
            />
          </Link>,
        ]);
        keyId += 2;
      });
    }
    return acc;
  }, [] as JSX.Element[]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className={clsx("grid gap-y-4 justify-center items-center", cols)}>
        {evolutionPath}
      </div>
    </div>
  );
}
