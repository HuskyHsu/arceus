import clsx from "clsx";

import { Avatars } from "@/components";
import { BossPokemon } from "@/models";

interface MarkerProps {
  pm: BossPokemon;
  updateKeywordFilter: Function;
  selected: boolean;
}

export function BossMarker({
  pm,
  updateKeywordFilter,
  selected = false,
}: MarkerProps) {
  return (
    <button
      onClick={() => {
        updateKeywordFilter();
      }}>
      <p
        className={clsx(
          "w-10 h-10 rounded-full bg-white",
          selected ? "animate-ping" : "opacity-0"
        )}></p>
      <Avatars pm={pm} size={"S"} style={clsx("ring-[2px] md:ring-[3px]")} />
    </button>
  );
}
