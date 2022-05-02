import { Link } from "react-router-dom";
import clsx from "clsx";

import { Avatars } from "@/components";
import { BossPokemon } from "@/models";

interface MarkerProps {
  pm: BossPokemon;
}

export function Marker({ pm }: MarkerProps) {
  return (
    <Link
      to={`/${pm.link}`}
      className={clsx(
        "flex flex-col justify-center items-center",
        "absolute -translate-y-2/4 -translate-x-2/4"
      )}
      style={{
        top: `${pm.position[1] / 10}%`,
        left: `${pm.position[0] / 10}%`,
      }}
    >
      <Avatars pm={pm} size={"S"} style={"ring-[3px]"} />
    </Link>
  );
}
