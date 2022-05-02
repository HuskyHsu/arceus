import clsx from "clsx";

import { Icon } from "@/components";
import { Filter } from "@/models";

import areaMap from "@/data/area.json";

interface FilterProps {
  toggereAreaSelect: Function;
  updateAreaSelect: Function;
  filter: Filter;
}

export function AreaSelect({
  filter,
  toggereAreaSelect,
  updateAreaSelect,
}: FilterProps) {
  return (
    <div className="">
      <button
        type="button"
        className="w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1"
        onClick={() => toggereAreaSelect()}
      >
        <span></span>
        {filter.area}
        <Icon.Down className="h-6 w-6" />
      </button>
      <ul
        className={clsx(
          "absolute z-20 w-32 mt-4 px-2 flex flex-col justify-center",
          "bg-white rounded-md shadow-md border-2",
          { hidden: !filter.areaSelector }
        )}
      >
        {Object.keys(areaMap.area)
          .sort()
          .filter((a) => Number(a) > 0)
          .map((a, i, arr) => {
            return (
              <li
                className={clsx(
                  "py-2 hover:bg-gray-200 text-center",
                  "transition-colors duration-200 transform cursor-pointer",
                  { "border-b-2": i !== arr.length - 1 }
                )}
                key={a}
                onClick={() =>
                  updateAreaSelect(areaMap.area[a as keyof typeof areaMap.area])
                }
              >
                {areaMap.area[a as keyof typeof areaMap.area]}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
