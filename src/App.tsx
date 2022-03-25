// import { useState } from "react";
import { GetTypeIcon } from "./components/TypeIcon";
import allPM from "./data/pokemon_.json";

interface Location {
  [propName: string]: number[] | undefined;
}

interface Obtain {
  mode: string;
  location?: string | Location;
  remark?: string;
}

interface Pokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  obtain: Obtain[];
  stats: number[];
  alt_form?: string;
}

interface Props {
  pm: Pokemon;
}

const zeroFilled = (n: Number) => ("000" + n).slice(-3);

enum Suffix {
  "洗翠" = "H",
  "砂土蓑衣" = "G",
  "垃圾蓑衣" = "S",
  "晴天形態" = "S",
  "白條紋" = "W",
  "雌性" = "F",
  "阿羅拉" = "A",
  "加熱洛托姆" = "O",
  "清洗洛托姆" = "W",
  "結冰洛托姆" = "R",
  "旋轉洛托姆" = "F",
  "切割洛托姆" = "L",
  "靈獸形態" = "T",
  "起源形態" = "O",
  "天空形態" = "S",
}

enum OutlineClass {
  "蟲" = "outline-type-bug",
  "惡" = "outline-type-dark",
  "龍" = "outline-type-dragon",
  "電" = "outline-type-electric",
  "妖精" = "outline-type-fairy",
  "格鬥" = "outline-type-fighting",
  "火" = "outline-type-fire",
  "飛行" = "outline-type-flying",
  "幽靈" = "outline-type-ghost",
  "草" = "outline-type-grass",
  "地面" = "outline-type-ground",
  "冰" = "outline-type-ice",
  "一般" = "outline-type-normal",
  "毒" = "outline-type-poison",
  "超能力" = "outline-type-psychic",
  "岩石" = "outline-type-rock",
  "鋼" = "outline-type-steel",
  "水" = "outline-type-water",
}

enum BgClass {
  "蟲" = "bg-type-bug",
  "惡" = "bg-type-dark",
  "龍" = "bg-type-dragon",
  "電" = "bg-type-electric",
  "妖精" = "bg-type-fairy",
  "格鬥" = "bg-type-fighting",
  "火" = "bg-type-fire",
  "飛行" = "bg-type-flying",
  "幽靈" = "bg-type-ghost",
  "草" = "bg-type-grass",
  "地面" = "bg-type-ground",
  "冰" = "bg-type-ice",
  "一般" = "bg-type-normal",
  "毒" = "bg-type-poison",
  "超能力" = "bg-type-psychic",
  "岩石" = "bg-type-rock",
  "鋼" = "bg-type-steel",
  "水" = "bg-type-water",
}

function PokemonBase({ pm }: Props) {
  const suffixes = Suffix[pm.alt_form as keyof typeof Suffix] ?? "";
  const outlineClass = OutlineClass[pm.types[0] as keyof typeof OutlineClass];
  const bgClass = BgClass[pm.types[0] as keyof typeof BgClass];

  return (
    <div className="p-2">
      <header className="w-24 h-24 relative">
        <div
          className={
            outlineClass +
            " " +
            bgClass +
            " w-20 h-20 rounded-full outline outline-2 bg-opacity-50 overflow-hidden absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2"
          }
        >
          <img
            src={`/arceus/image/icon/${zeroFilled(pm.pid)}${suffixes}.png`}
            alt=""
            className="max-w-none w-24 rounded-full absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </header>
      <ul className="h-14 flex flex-col justify-start items-center gap-y-2">
        <li className="text-gray-600 text-sm leading-none">
          #{zeroFilled(pm.id)}
        </li>
        <li className="flex gap-1">
          {GetTypeIcon(pm.types[0])}
          {pm.types.length > 1 && GetTypeIcon(pm.types[1])}
        </li>
        <li className="flex flex-col items-center gap-y-1">
          <span className="text-lg font-medium leading-none">{pm.name}</span>
          <span className="text-xs text-gray-500 font-thin">
            {pm.alt_form && `(${pm.alt_form})`}
          </span>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <article className="flex flex-col justify-center items-center mt-20 gap-8">
      <section className="w-5/6 max-w-xl">
        <form
          className={
            "flex items-center gap-2 p-4 justify-between rounded-full bg-opacity-20 " +
            BgClass["電"]
          }
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <input
              type="text"
              className="w-32 md:w-64 bg-opacity-0 bg-white"
              placeholder="Search"
            />
          </span>
          <button type="button" className="flex">
            <span>全區域</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </section>
      <section className="flex justify-center items-center flex-wrap content-center gap-x-4 gap-y-12 w-full md:w-5/6 max-w-4xl">
        {allPM.map((pm) => (
          <PokemonBase key={`${pm.pid}${pm.alt_form ?? ""}`} pm={pm} />
        ))}
      </section>
    </article>
  );
}

export default App;
