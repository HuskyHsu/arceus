import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Pokemon } from "@/models";
import { api, BASE_URL, bgTypeClass, zeroFilled } from "@/utils";
import { TypeIcon } from "@/components";

import { Header } from "./components/Header";
import { BaseStats } from "./components/BaseStats";
import { GetMethods } from "./components/GetMethods";
import { Items } from "./components/Items";
import clsx from "clsx";

const getData = async (pid: string) => {
  return await api<Pokemon>(`${BASE_URL}data/pokemon/${pid}.json`);
};

const getImgPath = (pm: Pokemon) => {
  const basePath = `${BASE_URL}image/pokemon/${pm.link}`;
  let imageMap = null;
  if (pm.genderDiff) {
    imageMap = {
      m: `${basePath}_m.png`,
      f: `${basePath}_f.png`,
      m_s: `${basePath}_m_s.png`,
      f_s: `${basePath}_f_s.png`,
    };
  } else {
    imageMap = {
      g: `${basePath}.png`,
      g_s: `${basePath}_s.png`,
    };
  }
  return imageMap;
};

interface Props {
  pokemon: Pokemon;
}

function DisplayImage({ pokemon }: Props) {
  return (
    <img
      src={pokemon.genderDiff ? pokemon.imgPath.m : pokemon.imgPath.g}
      alt=""
      className="w-full -ml-48"
    />
  );
}

function Types({ pokemon }: Props) {
  if (pokemon.types.length === 0) {
    return <></>;
  }
  return (
    <ul className="flex gap-2 h-6">
      {pokemon.types.map((type) => {
        return (
          <li
            className={clsx(
              "flex gap-2 pr-2 rounded-sm items-center",
              "bg-slate-600 text-slate-100"
            )}
            key={type}
          >
            <TypeIcon type={type} className="w-6 h-6" />
            <span className="">{type}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Detail() {
  let { link = "722" } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    pid: 0,
    name: "",
    types: [],
    genderDiff: false,
    getMethods: [],
    stats: [0, 0, 0, 0, 0, 0],
    items: [],
    link: "",
    learnset: { levelingUp: [], tutoring: [] },
    previous: {
      id: 0,
      pid: 0,
      name: "",
      types: [],
      genderDiff: false,
      link: "",
    },
    next: { id: 0, pid: 0, name: "", types: [], genderDiff: false, link: "" },
    imgPath: {},
  });

  useEffect(() => {
    (async () => {
      const data = await getData(link as string);
      data.imgPath = getImgPath(data);
      setPokemon(data);
    })();
  }, []);

  const center = "flex justify-center items-center";

  return (
    <article className={clsx("h-screen", center, bgTypeClass(pokemon.types))}>
      <div
        className={clsx("flex-initial flex flex-col h-full w-8/12", center)}
        style={{
          clipPath: "polygon(0 0, 100% 0%, 85% 100%, 0% 100%)",
        }}
      >
        <div className="w-full h-28 pl-36 flex items-center bg-slate-200">
          《 001 002 003 004 005 006 007 008 009 010 》
        </div>
        <div className="w-full h-20 pl-36 flex items-center gap-4 bg-slate-300">
          <span className="text-3xl leading-none">
            {pokemon.name}{" "}
            {pokemon.altForm && (
              <span className="text-sm text-slate-600 leading-none">
                ({pokemon.altForm})
              </span>
            )}
          </span>
          <Types pokemon={pokemon} />
        </div>
        <div className="w-full h-16 pl-36 flex items-end bg-slate-400 border-b border-gray-200">
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 border border-b-0 border-gray-300 sm:text-base rounded-t-md whitespace-nowrap focus:outline-none bg-white">
            基本資訊
          </button>
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            捕獲
          </button>
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            升等招式
          </button>
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            傳授招式
          </button>
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            進化途徑
          </button>
          <button className="flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
            出沒地圖
          </button>
        </div>
        <div className="w-full grow pl-36 pr-28 bg-white">
          <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  等級
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  精通
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  招式
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  屬性
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  分類
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  威力
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  命中
                </th>
                <th className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
                  PP
                </th>
              </tr>
            </thead>
            <tbody>
              {pokemon.learnset.levelingUp.map((move, i) => (
                <tr key={i}>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.learn < 0 ? "進化" : move.learn}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.mastery}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.name}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    <TypeIcon type={move.type} className="w-6 h-6" />
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.category}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.power}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.accuracy}
                  </td>
                  <td className="border-t-2 border-gray-200 px-2 py-1">
                    {move.PP}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={clsx("flex-initial h-full w-4/12", center)}>
        <DisplayImage pokemon={pokemon} />
        <span className="absolute bottom-0 right-0 text-white text-7xl">
          #{zeroFilled(pokemon.id)}
        </span>
      </div>
    </article>
  );
}

export default Detail;
