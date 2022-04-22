import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { Pokemon } from "@/models";
import { api, BASE_URL, bgTypeClass } from "@/utils";
import { Tabs } from "@/components";

import { Hero, BaseInfo, Learnset } from "./components";

const defaultPokemon = {
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
};

export const PokemonContext = createContext(defaultPokemon as Pokemon);

const usePokemon = (link: string) => {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);

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

  useEffect(() => {
    (async () => {
      const data = await getData(link);
      data.imgPath = getImgPath(data);
      setPokemon(data);
    })();
  }, []);

  return pokemon;
};

function Detail() {
  let { link = "722" } = useParams();
  const pokemon = usePokemon(link);

  const [actionTab, setActionTab] = useState("升等招式");
  const taggleTab = (value: string) => {
    setActionTab(value);
  };

  const cssCenter = "flex justify-center items-center";

  return (
    <PokemonContext.Provider value={pokemon}>
      <article
        className={clsx("h-screen", cssCenter, bgTypeClass(pokemon.types))}>
        <div
          className={clsx(
            "flex-initial flex flex-col h-full w-9/12",
            cssCenter,
            "bg-slate-200"
          )}
          style={{
            clipPath: "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)",
          }}>
          <div className="w-full h-28 pl-36 flex items-center">
            《 001 002 003 004 005 006 007 008 009 010 》
          </div>
          <div className="w-full h-20 pl-36 flex items-center gap-4">
            <BaseInfo />
          </div>
          <div className="w-full h-16 pl-36 flex items-end border-b">
            <Tabs
              tabs={[
                "基本資訊",
                "捕獲",
                "升等招式",
                "傳授招式",
                "進化途徑",
                "出沒地圖",
              ]}
              action={actionTab}
              taggleTab={taggleTab}
            />
          </div>
          <div className="w-full grow pl-36 pr-60 bg-white">
            <div className="max-h-[28rem] overflow-y-auto mt-8">
              {actionTab === "升等招式" && <Learnset.LevelingUp />}
              {actionTab === "傳授招式" && <Learnset.Tutoring />}
            </div>
          </div>
        </div>
        <div className={clsx("flex-initial h-full w-3/12", cssCenter)}>
          <Hero />
        </div>
      </article>
    </PokemonContext.Provider>
  );
}

export default Detail;
