import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Pokemon } from "@/models";
import { api, BASE_URL } from "@/utils";
import { TypeIcon } from "@/components";

import { Header } from "./components/Header";
import { BaseStats } from "./components/BaseStats";
import { GetMethods } from "./components/GetMethods";
import { Items } from "./components/Items";

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

  return (
    <article className="flex flex-col justify-center items-center my-16">
      <article className="w-5/6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <Header pokemon={pokemon} />
        </section>
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <BaseStats pokemon={pokemon} />
        </section>
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <GetMethods pokemon={pokemon} />
        </section>
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <Items pokemon={pokemon} />
        </section>
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <h2 className="mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg">
            升等招式
          </h2>
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
        </section>
        <section className="max-w-md w-full px-4 py-4 mx-auto bg-slate-400/10 rounded-lg shadow-lg">
          <h2 className="mt-2 text-xl font-semibold text-gray-800 md:mt-0 md:text-lg">
            傳授招式
          </h2>
          <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
            <thead>
              <tr>
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
              {pokemon.learnset.tutoring.map((move, i) => (
                <tr key={i}>
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
        </section>
        <section className="md:col-span-2">
          <h3 className="text-xl"></h3>
        </section>
      </article>
    </article>
  );
}

export default Detail;
