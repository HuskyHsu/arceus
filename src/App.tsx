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

function PokemonBase({ pm }: Props) {
  const suffixes = Suffix[pm.alt_form as keyof typeof Suffix] ?? "";

  return (
    <div className="p-2">
      <div className="w-24 h-24 relative">
        <div
          className="w-20 h-20 rounded-full outline outline-2 outline-type-electric bg-opacity-50
overflow-hidden absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <img
            src={
              window.location.origin +
              `/src/assets/image/icon/${zeroFilled(pm.pid)}${suffixes}.png`
            }
            alt=""
            className="max-w-none w-24 rounded-full absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="h-16 flex flex-col justify-start items-center gap-y-2">
        <span className="text-gray-600 text-sm leading-none">
          #{zeroFilled(pm.id)}
        </span>
        <span className="flex gap-1">
          {GetTypeIcon(pm.types[0])}
          {pm.types.length > 1 && GetTypeIcon(pm.types[1])}
        </span>
        <span className="text-lg font-bold leading-none flex flex-col items-center">
          {pm.name}
          {pm.alt_form && (
            <span className="text-xs text-gray-500 font-thin">
              ({pm.alt_form})
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center flex-wrap content-center gap-x-4 gap-y-8 w-5/6">
        {allPM.slice(0).map((pm) => (
          <PokemonBase pm={pm} />
        ))}
      </div>
    </div>
  );
}

export default App;
