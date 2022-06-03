import { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { CatchType, MethodTypes, TypeMap } from "@/models";
import { TypeIcon, Icon } from "@/components";
import areaMap from "@/data/area.json";
import { FilterContext } from "../List";

interface TypeProps {
  type: string;
}

interface ButtonProps {
  children: JSX.Element;
  typeName: string;
  TypeKey: string;
}

function AreaSelect() {
  const { filter, toggereAreaSelect, updateAreaSelect } =
    useContext(FilterContext);

  return (
    <div className="relative">
      <button
        type="button"
        className="w-32 flex justify-evenly bg-white rounded-full shadow px-2 py-1"
        onClick={() => toggereAreaSelect()}>
        <span>{filter.area}</span>
        <Icon.Down className="h-6 w-6" />
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
      <Link to="/map" className="bg-white rounded-full p-1 shadow-md">
        <Icon.Map className="h-6 w-6" />
      </Link>
      <AreaSelect />
    </>
  );
}

function Tip({ type }: TypeProps) {
  const width = type.length <= 4 ? "w-20" : "w-32";
  return (
    <div
      className={clsx(
        "absolute -translate-x-1/2 -top-8 left-4 hidden group-hover:block",
        width
      )}>
      <p
        className={clsx(
          "rounded z-20",
          "text-center",
          "bg-slate-600 text-white",
          width
        )}>
        {type}
      </p>
      <p
        className={clsx(
          "w-0 h-0 border-8 my-0 mx-auto",
          "border-t-slate-600 border-x-transparent border-b-transparent"
        )}></p>
    </div>
  );
}

function CatchTypeButton({ children, typeName, TypeKey }: ButtonProps) {
  const { filter, updateCatchTypeFilter } = useContext(FilterContext);
  return (
    <button
      type="button"
      className={clsx(
        "flex justify-center items-center",
        "h-10 w-10 rounded-md",
        "border-2 border-slate-400",
        {
          "opacity-50 grayscale": !filter.types[TypeKey],
        }
      )}
      onClick={() => {
        updateCatchTypeFilter(TypeKey);
      }}>
      <div className="group relative">
        {children}
        <Tip type={typeName} />
      </div>
    </button>
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
          )}>
          <SearchInput />
        </li>
        <li className="w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4">
          {Object.keys(TypeMap).map((type) => (
            <div key={type} className="group relative h-8">
              <TypeIcon
                type={type}
                className={clsx("w-8 h-8", {
                  "opacity-30": !filter.types[type],
                })}
                button={true}
                clickFn={() => updateTypeFilter(type)}
              />
              <Tip type={type} />
            </div>
          ))}
        </li>
        <li className="w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4">
          <CatchTypeButton typeName="捕捉" TypeKey={CatchType.respawn}>
            <Icon.Ball className={clsx("w-8 h-8")} />
          </CatchTypeButton>
          <CatchTypeButton typeName="搖晃樹木" TypeKey={CatchType.tree}>
            <Icon.Tree className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="搖晃礦石" TypeKey={CatchType.crystal}>
            <Icon.Crystal className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="定點頭目" TypeKey={CatchType.boss}>
            <Icon.Boss className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="時空扭曲" TypeKey={CatchType.distortion}>
            <Icon.Distortion className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="大量出現" TypeKey={CatchType.mass}>
            <Icon.Star className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="大大大量出現" TypeKey={CatchType.massive}>
            <Icon.Stars className="h-8 w-8" />
          </CatchTypeButton>
          <CatchTypeButton typeName="任務事件" TypeKey={MethodTypes.event}>
            <Icon.Flag className="h-8 w-8" />
          </CatchTypeButton>
        </li>
      </ul>
    </form>
  );
}
