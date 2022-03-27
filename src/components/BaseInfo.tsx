import clsx from "clsx";

import { Props } from "../models";
import { Avatars } from "./Avatars";
import { TypeIcon } from "./TypeIcon";
import { zeroFilled } from "../utils/id";
import { bgTypeClass } from "../utils/color";

function Types({ pm }: Props) {
  return (
    <li className="flex gap-1">
      {TypeIcon(pm.types[0])}
      {pm.types.length > 1 && TypeIcon(pm.types[1])}
    </li>
  );
}

function Name({ pm }: Props) {
  return (
    <li className="flex flex-col items-center gap-y-1">
      <span className="text-lg font-medium leading-none group-hover:text-white">
        {pm.name}
      </span>
      <span className="text-xs text-gray-500 font-thin group-hover:text-white">
        {pm.alt_form && `(${pm.alt_form})`}
      </span>
    </li>
  );
}

export function BaseInfo({ pm }: Props) {
  return (
    <a
      className={clsx(
        "group p-2 drop-shadow-md",
        "bg-gradient-to-b from-transparent to-transparent",
        "hover:drop-shadow-xl transition-all",
        bgTypeClass(pm.types.slice(0).reverse(), true),
        "rounded-md"
      )}
      href="#"
    >
      <Avatars pm={pm} />
      <ul className="h-24 flex flex-col justify-start items-center gap-y-2">
        <li className="text-gray-600 text-sm leading-none group-hover:text-white">
          #{zeroFilled(pm.id)}
        </li>
        <Types pm={pm} />
        <Name pm={pm} />
      </ul>
    </a>
  );
}
