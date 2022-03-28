import clsx from "clsx";

import { Filter, Props } from "../models";
import { Avatars } from "./Avatars";
import { TypeIcon } from "./TypeIcon";
import { zeroFilled } from "../utils/id";
import { bgTypeClass } from "../utils/color";

interface PmCard extends Props {
  filter: Filter;
}

function Types({ pm }: Props) {
  if (pm.types.length === 1) {
    return <TypeIcon type={pm.types[0]} />;
  }
  return (
    <li className="flex gap-1">
      {
        <>
          <TypeIcon type={pm.types[0]} />
          <TypeIcon type={pm.types[1]} />
        </>
      }
    </li>
  );
}

function Name({ pm }: Props) {
  return (
    <li
      className={clsx(
        "flex flex-col items-center gap-y-1",
        "text-lg font-medium leading-none group-hover:text-white transition-all"
      )}
    >
      {pm.name}
      {pm.alt_form && (
        <span className="text-xs font-thin">{`(${pm.alt_form})`}</span>
      )}
    </li>
  );
}

export function BaseInfo({ pm, filter }: PmCard) {
  return (
    <button
      type="button"
      className={clsx(
        "group px-2 md:px-4 py-2 drop-shadow-md",
        "hover:drop-shadow-xl",
        "before:opacity-0 before:absolute before:inset-0 before:rounded-md",
        "before:bg-gradient-to-b",
        bgTypeClass(pm.types.slice(0).reverse(), true),
        "before:hover:opacity-60 before:-z-10 before:transition-opacity before:duration-500",
        {
          hidden: !pm.name.includes(filter.keyword),
        }
      )}
    >
      <Avatars pm={pm} />
      <ul
        className={clsx(
          "h-24 z-0 flex flex-col justify-start items-center gap-y-2",
          "text-gray-700 group-hover:text-white"
        )}
      >
        <li className="text-sm leading-none">#{zeroFilled(pm.id)}</li>
        <Types pm={pm} />
        <Name pm={pm} />
      </ul>
    </button>
  );
}
