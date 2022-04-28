import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { BasePokemon, Pokemon } from "@/models";
import { api, BASE_URL, bgTypeClass } from "@/utils";
import { Icon, Tabs } from "@/components";

import {
  QuickList,
  Hero,
  NameTypes,
  BaseInfo,
  Learnset,
  Evolution,
} from "./components";

interface Props {
  pokemonList: BasePokemon[];
}

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
  linkPid: "",
  learnset: { levelingUp: [], tutoring: [] },
  imgPath: {},
};

export const PokemonContext = createContext(defaultPokemon as Pokemon);

const usePokemon = (link: string, tabList: string[]) => {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);
  const [display, setDisplay] = useState({
    actionTab: tabList[0],
    selectGender: pokemon.genderDiff ? "male" : "same",
    shiny: false,
  });

  const getData = async (pid: string) => {
    return await api<Pokemon>(`${BASE_URL}data/pokemon/${pid}.json`);
  };

  const getImgPath = (pm: Pokemon) => {
    const basePath = `${BASE_URL}image/pokemon/${pm.linkPid}`;
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
        s: `${basePath}.png`,
        s_s: `${basePath}_s.png`,
      };
    }
    return imageMap;
  };

  useEffect(() => {
    (async () => {
      const data = await getData(link);
      data.imgPath = getImgPath(data);
      setPokemon(data);
      setDisplay((display) => {
        return {
          ...display,
          ...{ selectGender: data.genderDiff ? "male" : "same" },
        };
      });
    })();
  }, [link]);

  const taggleTab = (value: string) => {
    setDisplay((display) => {
      return { ...display, ...{ actionTab: value } };
    });
  };

  const taggleShiny = () => {
    setDisplay((display) => {
      return { ...display, ...{ shiny: !display.shiny } };
    });
  };

  const taggleGender = (gender: string) => {
    setDisplay((display) => {
      return {
        ...display,
        ...{
          selectGender:
            display.selectGender !== gender ? gender : display.selectGender,
        },
      };
    });
  };

  return { pokemon, display, taggleTab, taggleShiny, taggleGender };
};

const getSubList = (
  pokemonList: BasePokemon[],
  range: number,
  link: string
) => {
  const listIndex = pokemonList.findIndex((pm) => pm.link === link);
  const listRange = [
    listIndex - range < 0 ? 0 : listIndex - range,
    listIndex + range + 1 > pokemonList.length
      ? pokemonList.length
      : listIndex + range + 1,
  ];
  let subList = pokemonList.slice(...listRange);
  if (subList.length < range * 2 + 1) {
    if (listRange[0] === 0) {
      subList = pokemonList
        .slice(
          pokemonList.length - range * 2 - 1 + subList.length,
          pokemonList.length
        )
        .concat(subList);
    } else if (listRange[1] === pokemonList.length) {
      subList = subList.concat(
        pokemonList.slice(0, range * 2 + 1 - subList.length)
      );
    }
  }
  return subList;
};

function Detail({ pokemonList }: Props) {
  let { link = "001" } = useParams();
  const tabList = ["基本資訊", "升等招式", "傳授招式", "進化途徑"];
  const { pokemon, display, taggleTab, taggleShiny, taggleGender } = usePokemon(
    link,
    tabList
  );

  const cssCenter = "flex md:justify-center items-center";

  const isMobile = window.screen.width < 768;
  const range = isMobile ? 1 : 5;
  const clipPath = isMobile ? "" : "polygon(0 0, 100% 0%, 90% 100%, 0% 100%)";

  const subList = getSubList(pokemonList, range, link);

  return (
    <PokemonContext.Provider value={pokemon}>
      <article
        className={clsx(
          "h-screen",
          cssCenter,
          "flex-col md:flex-row",
          isMobile ? "bg-inherit" : bgTypeClass(pokemon.types),
          "relative overflow-y-auto md:overflow-hidden",
          "text-slate-600"
        )}>
        <div
          className={clsx(
            "flex-initial flex flex-col h-full w-full md:w-9/12",
            cssCenter,
            "bg-gray-200 bg-repeat",
            "order-2 md:order-1"
          )}
          style={{
            clipPath: clipPath,
            backgroundImage: `url(${BASE_URL}image/bg-weave-light.jpg)`,
          }}>
          <div className="w-full h-24 md:pl-36 flex items-center justify-center md:justify-start gap-4 overflow-x-auto text-lg text-slate-300">
            <QuickList pokemonList={subList} link={link} />
          </div>
          <div
            className="w-full h-12 md:pl-36 flex items-center justify-center md:justify-start gap-4 text-white bg-no-repeat bg-contain"
            style={{
              clipPath: clipPath,
              backgroundImage: `url(${BASE_URL}image/brush_1.png)`,
              backgroundSize: isMobile ? "350px 40px" : "350px 40px",
              backgroundPosition: isMobile ? "center" : "8rem 0.4rem",
            }}>
            <NameTypes />
          </div>
          <div className="w-full h-16 md:pl-36 flex items-end justify-center md:justify-start">
            <Tabs
              tabs={tabList}
              action={display.actionTab}
              taggleTab={taggleTab}
            />
          </div>
          <div className="w-full grow md:pl-36 md:pr-60 bg-white">
            <div className="max-h-[28rem] overflow-y-auto mt-4 px-4 md:p-0">
              {display.actionTab === "基本資訊" && <BaseInfo />}
              {display.actionTab === "升等招式" && <Learnset.LevelingUp />}
              {display.actionTab === "傳授招式" && <Learnset.Tutoring />}
              {display.actionTab === "進化途徑" && <Evolution />}
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "flex-initial h-60 w-full max-h-min md:h-full md:w-3/12",
            "flex justify-center",
            cssCenter,
            isMobile ? bgTypeClass(pokemon.types) : "bg-inherit",
            "order-1 md:order-2",
            "bg-bottom bg-no-repeat"
          )}>
          <Hero
            display={display}
            taggleShiny={taggleShiny}
            taggleGender={taggleGender}
          />
          <div
            className={clsx(
              "absolute",
              isMobile ? "top-0 right-0" : "bottom-0"
            )}>
            <Icon.PokemonBall
              className={clsx(isMobile ? "h-60 w-60" : "h-[30rem] w-[30rem]")}
            />
          </div>
          <div
            className={clsx(
              "absolute top-0",
              "w-full",
              isMobile ? "h-60" : "h-full",
              "bg-repeat-x bg-bottom"
            )}
            style={{
              backgroundImage: `url(${BASE_URL}image/preorder-button-bg.png)`,
            }}></div>
        </div>
      </article>
    </PokemonContext.Provider>
  );
}

export default Detail;
