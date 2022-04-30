import { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Filter, BaseProps } from "@/models";
import { Avatars, TypeIcon } from "@/components";
import { zeroFilled, bgTypeClass } from "@/utils";
import { FilterContext } from "../List";

interface PmCard extends BaseProps {
  filter: Filter;
}

function isHidden({ pm, filter }: PmCard) {
  let hidden = false;
  if (filter.keyword !== "") {
    hidden = !pm.name.includes(filter.keyword);
  }
  if (!hidden && filter.area !== "全區域") {
    hidden = !pm.locations?.has(filter.area) || false;
  }
  if (!hidden && Object.values(filter.types).some((bool) => !bool)) {
    hidden = pm.types.find((type) => filter.types[type]) === undefined;
  }
  return hidden;
}

function Types({ pm }: BaseProps) {
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

function Name({ pm }: BaseProps) {
  return (
    <li
      className={clsx(
        "flex flex-col items-center gap-y-1",
        "text-lg font-medium leading-none group-hover:text-white transition-all"
      )}
    >
      {pm.name}
      {pm.altForm && (
        <span className="text-xs font-thin">{`(${pm.altForm})`}</span>
      )}
    </li>
  );
}

export function BaseInfo({ pm }: BaseProps) {
  const { filter } = useContext(FilterContext);
  const hidden = isHidden({ pm, filter });
  return (
    <div
      className={clsx(
        "px-2 md:px-4 py-2 rounded-md",
        "relative group",
        "bg-gradient-to-b from-transparent to-transparent",
        bgTypeClass(pm.types.slice(0).reverse(), true),
        "hover:drop-shadow-xl",
        hidden ? "hidden" : ""
      )}
    >
      <Link to={`/${pm.link}`}>
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
      </Link>
    </div>
  );
}
