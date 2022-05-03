import clsx from "clsx";

import { Avatars } from "@/components";
import { BossPokemon } from "@/models";

interface MarkerProps {
  pm: BossPokemon;
  updateKeywordFilter: Function;
  selected: boolean;
}

export function Marker({
  pm,
  updateKeywordFilter,
  selected = false,
}: MarkerProps) {
  return (
    <button
      className={clsx(
        "flex flex-col justify-center items-center",
        "absolute -translate-y-2/4 -translate-x-2/4"
      )}
      style={{
        top: `${pm.position[1] / 10}%`,
        left: `${pm.position[0] / 10}%`,
      }}
      onClick={() => {
        updateKeywordFilter();
      }}>
      <p
        className={clsx(
          "absolute w-10 h-10 rounded-full bg-white",
          selected ? "animate-ping" : "opacity-0"
        )}></p>
      <Avatars pm={pm} size={"S"} style={clsx("ring-[2px] md:ring-[3px]")} />
    </button>
  );
}
