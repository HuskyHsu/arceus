import { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import {
  Filter,
  BaseProps,
  TypeMap,
  MethodTypes,
  ListPokemon,
  CatchType,
} from "@/models";
import { Avatars, TypeIcon } from "@/components";
import { zeroFilled, bgTypeClass } from "@/utils";
import { FilterContext } from "../List";

interface PmCard extends BaseProps {
  filter: Filter;
}

function isDisplay({ pm, filter }: PmCard) {
  let display = true;

  if (filter.keyword !== "") {
    display = pm.name.includes(filter.keyword);
  }
  if (!display) {
    return display;
  }

  if (Object.values(TypeMap).some((type) => !filter.types[type])) {
    display = pm.types.find((type) => filter.types[type]) !== undefined;
  }
  if (!display) {
    return display;
  }

  if (filter.area !== "全區域") {
    display =
      (pm as ListPokemon).getMethods.find((getMethod) => {
        if (getMethod.type === MethodTypes.event) {
          return (
            filter.types[MethodTypes.event] &&
            getMethod.location === filter.area
          );
        } else if (getMethod.type === MethodTypes.evolution) {
          return false;
        }
        return getMethod.location === filter.area;
      }) !== undefined;
  }
  if (!display) {
    return display;
  }

  if (Object.values(CatchType).some((type) => !filter.types[type])) {
    display =
      (pm as ListPokemon).getMethods
        .filter((getMethod) => {
          if (filter.area === "全區域") {
            return true;
          }

          if (getMethod.type === MethodTypes.evolution) {
            return false;
          } else if (getMethod.type === MethodTypes.event) {
            return (
              filter.types[MethodTypes.event] &&
              getMethod.location === filter.area
            );
          }
          return getMethod.location === filter.area;
        })
        .find((getMethod) => {
          if (getMethod.type === MethodTypes.evolution) {
            return false;
          } else if (getMethod.type === MethodTypes.event) {
            return filter.types[MethodTypes.event];
          } else if (getMethod.type === MethodTypes.catch) {
            return Object.keys(CatchType)
              .filter((type) => filter.types[type])
              .some((type) => {
                return getMethod[type as keyof typeof CatchType];
              });
          }
        }) !== undefined;
  }

  return display;
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
      )}>
      {pm.name}
      {pm.altForm && (
        <span className="text-xs font-thin">{`(${pm.altForm})`}</span>
      )}
    </li>
  );
}

export function BaseInfo({ pm }: BaseProps) {
  const { filter } = useContext(FilterContext);
  const display = isDisplay({ pm, filter });
  return (
    <div
      className={clsx(
        "px-2 md:px-4 py-2 rounded-md",
        "relative group",
        "bg-gradient-to-b from-transparent to-transparent",
        bgTypeClass(pm.types.slice(0).reverse(), true),
        "hover:drop-shadow-xl",
        {
          hidden: !display,
        }
      )}>
      <Link to={`/${pm.link}`}>
        <Avatars pm={pm} />
        <ul
          className={clsx(
            "h-24 z-0 flex flex-col justify-start items-center gap-y-2",
            "text-gray-700 group-hover:text-white"
          )}>
          <li className="text-sm leading-none">#{zeroFilled(pm.id)}</li>
          <Types pm={pm} />
          <Name pm={pm} />
        </ul>
      </Link>
    </div>
  );
}
