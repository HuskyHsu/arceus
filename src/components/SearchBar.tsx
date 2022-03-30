import clsx from "clsx";
import { Fragment } from "react";

import { Search, Down } from "./icon";
import { Filter, TypeMap } from "../models";
import areaMap from "../data/area.json";
import { TypeIcon } from "./TypeIcon";
import { defaultTypeTrue, defaultTypeFalse } from "../utils/status";

interface Props {
  setFilter: Function;
  filter: Filter;
}

function AreaSelect({ filter, setFilter }: Props) {
  function toggerSelect() {
    setFilter((filter: Filter) => {
      return { ...filter, ...{ areaSelector: !filter.areaSelector } };
    });
  }

  function updateAreaSelect(area: string) {
    setFilter((filter: Filter) => {
      return {
        ...filter,
        ...{ area: area, areaSelector: false },
      };
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1"
        onClick={() => toggerSelect()}>
        <span>{filter.area}</span>
        <Down className="h-6 w-6" />
      </button>
      <ul
        className={clsx(
          "absolute z-20 w-32 mt-4 px-2 flex flex-col justify-center",
          "bg-white rounded-md shadow-md border-2",
          { hidden: !filter.areaSelector }
        )}>
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
                }>
                {areaMap.area[a as keyof typeof areaMap.area]}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function SearchInput({ filter, setFilter }: Props) {
  function updateInput(e: React.FormEvent<HTMLInputElement>) {
    const keyword = e.currentTarget.value;
    setFilter((filter: Filter) => {
      return { ...filter, keyword };
    });
  }

  return (
    <>
      <span className="w-full flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          className="w-full bg-gray-100 focus:outline-0"
          placeholder="Search"
          onChange={updateInput}
        />
      </span>
      <AreaSelect filter={filter} setFilter={setFilter} />
    </>
  );
}

export function SearchBar({ filter, setFilter }: Props) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const updateInput = (type: string) => {
    setFilter((filter: Filter) => {
      let { types } = filter;
      if (Object.values(types).every((bool) => bool)) {
        types = { ...defaultTypeFalse, ...{ [type]: true } };
      } else {
        types = { ...types, ...{ [type]: !types[type] } };
        if (Object.values(types).every((bool) => !bool)) {
          types = { ...defaultTypeTrue };
        }
      }
      return { ...filter, ...{ types } };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="flex flex-col items-center gap-y-8">
        <li
          className={clsx(
            "w-full max-w-xl flex items-center gap-2 px-4 py-2 justify-between",
            "rounded-full bg-gray-100 shadow-inner shadow-gray-700"
          )}>
          <SearchInput filter={filter} setFilter={setFilter} />
        </li>
        <li className="w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4">
          {Object.keys(TypeMap).map((type) => (
            <TypeIcon
              key={type}
              type={type}
              className={clsx("w-8 h-8", { "opacity-30": !filter.types[type] })}
              button={true}
              clickFn={() => updateInput(type)}
            />
          ))}
        </li>
      </ul>
    </form>
  );
}
