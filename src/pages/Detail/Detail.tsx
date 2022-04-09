import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "@/utils/http";
import { BASE_URL } from "@/utils/const";
import { Radar } from "./components/radarChart";
import clsx from "clsx";
import { zeroFilled } from "@/utils/id";
import { MoveCategory, NameSuffix, getMethod, TypeMap } from "@/models";

interface BasePokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  altForm?: string;
  genderDiff: boolean;
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
interface Pokemon extends BasePokemon {
  getMethods: getMethod[];
  stats: number[];
  evolution?: Evolution[];
  items: Item[];
  learnset: Learnset;
  previous: BasePokemon;
  next: BasePokemon;
  link: string;
  genderDiff: boolean;
  imgPath?: string;
}

const getData = async (pid: string) => {
  return await api<Pokemon>(`${BASE_URL}data/pokemon/${pid}.json`);
};

function Detail() {
  let { pid = "724" } = useParams();
  const getImgPath = (pm: Pokemon) => {
    return `${BASE_URL}image/pokemon/${pm.link}${
      pm.genderDiff ? "_M" : ""
    }.png`;
  };

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
    previous: { id: 0, pid: 0, name: "", types: [], genderDiff: false },
    next: { id: 0, pid: 0, name: "", types: [], genderDiff: false },
  });

  useEffect(() => {
    (async () => {
      const data = await getData(pid);
      data.imgPath = getImgPath(data);
      setPokemon(data);
    })();
  }, []);

  return (
    <article className="flex flex-col justify-center items-center my-16">
      <article className="w-5/6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="">
          <h3 className="text-xl">種族值</h3>
          <Radar stats={pokemon.stats} />
        </section>
        <section className="">
          <img
            src={pokemon.imgPath}
            loading="lazy"
            alt=""
            className={clsx("max-w-none w-96 rounded-full")}
          />
          <h3 className="text-xl">
            {pokemon.name}:{pokemon.types.join(";")}
          </h3>
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
