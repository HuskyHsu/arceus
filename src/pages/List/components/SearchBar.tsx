import { useContext } from "react";
import clsx from "clsx";

import { TypeMap } from "@/models";
import { TypeIcon, Icon } from "@/components";
import areaMap from "@/data/area.json";
import { FilterContext } from "../List";

function AreaSelect() {
  const { filter, toggereAreaSelect, updateAreaSelect } =
    useContext(FilterContext);

  return (
    <div className="relative">
      <button
        type="button"
        className="w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1"
        onClick={() => toggereAreaSelect()}
      >
        <span>{filter.area}</span>
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

function SearchInput() {
  const { filter, updateKeywordFilter } = useContext(FilterContext);

  function updateInput(e: React.FormEvent<HTMLInputElement>) {
    updateKeywordFilter(e.currentTarget.value);
  }

  return (
    <>
      <span className="w-full flex items-center gap-2">
        <Icon.Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          className="w-full bg-gray-100 focus:outline-0"
          placeholder="Search"
          onChange={updateInput}
          value={filter.keyword}
        />
      </span>
      <AreaSelect />
    </>
  );
}

export function SearchBar() {
  const { filter, updateTypeFilter } = useContext(FilterContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="flex flex-col items-center gap-y-8">
        <li
          className={clsx(
            "w-full max-w-xl flex items-center gap-2 px-4 py-2 justify-between",
            "rounded-full bg-gray-100 shadow-inner shadow-gray-700"
          )}
        >
          <SearchInput />
        </li>
        <li className="w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4">
          {Object.keys(TypeMap).map((type) => (
            <TypeIcon
              key={type}
              type={type}
              className={clsx("w-8 h-8", { "opacity-30": !filter.types[type] })}
              button={true}
              clickFn={() => updateTypeFilter(type)}
            />
          ))}
        </li>
      </ul>
    </form>
  );
}
