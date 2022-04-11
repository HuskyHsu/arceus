import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MoveCategory, getMethod, TypeMap } from "@/models";
import { api } from "@/utils/http";
import { BASE_URL } from "@/utils/const";
import { Header } from "./components/Header";
import { BaseStats } from "./components/BaseStats";

interface BasePokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  altForm?: string;
  genderDiff: boolean;
  link: string;
}

interface Move {
  id: number;
  name: string;
  type: TypeMap;
  category: MoveCategory;
  power: number;
  accuracy: number;
  PP: number;
  description: string;
  effect: string;
  agilePower: number;
  agileEffect: string;
  strongPower: number;
  strongAccuracy: number;
  strongEffect: string;
}

interface levelingUpMove extends Move {
  learn: number;
  mastery: number;
}

interface Learnset {
  levelingUp: levelingUpMove[];
  tutoring: Move[];
}

interface Evolution {
  before: BasePokemon;
  after: BasePokemon;
  require: string;
}

interface Item {
  name: string;
  "%": number;
  boss: boolean;
}

interface ImageMap {
  m?: string;
  f?: string;
  m_s?: string;
  f_s?: string;
  g?: string;
  g_s?: string;
}

export interface Pokemon extends BasePokemon {
  getMethods: getMethod[];
  stats: number[];
  evolution?: Evolution[];
  items: Item[];
  learnset: Learnset;
  previous: BasePokemon | null;
  next: BasePokemon | null;
  genderDiff: boolean;
  imgPath: ImageMap;
}

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
      <article className="w-5/6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="">
          <Header pokemon={pokemon} />
        </section>
        <section className="">
          <BaseStats pokemon={pokemon} />
        </section>
        <section className="">
          <h3 className="text-xl">出沒地點</h3>
          <ul>
            {pokemon.getMethods.map((get, i) => (
              <li key={i}>
                {get.location &&
                  typeof get.location === "string" &&
                  get.location + " - "}
                {get.location &&
                  typeof get.location === "object" &&
                  JSON.stringify(get.location) + " - "}
                {get.mode}
                {get.remark && `(${get.remark})`}
              </li>
            ))}
          </ul>
        </section>
        <section className="">
          <h3 className="text-xl">攜帶道具</h3>
          <ul>
            {pokemon.items.map((item, i) => (
              <li key={i}>
                {item.name}({item["%"]}%){item.boss && "(頭目)"}
              </li>
            ))}
          </ul>
        </section>
        <section className="">
          <h3 className="text-xl">升等招式</h3>
          <ul>
            {pokemon.learnset.levelingUp.map((move, i) => (
              <li key={i}>
                {move.learn} -{move.mastery} : {move.name}
              </li>
            ))}
          </ul>
        </section>
        <section className="">
          <h3 className="text-xl">傳授招式</h3>
          <ul>
            {pokemon.learnset.tutoring.map((move, i) => (
              <li key={i}>{move.name}</li>
            ))}
          </ul>
        </section>
        <section className="md:col-span-2">
          <h3 className="text-xl"></h3>
        </section>
      </article>
    </article>
  );
}

export default Detail;
