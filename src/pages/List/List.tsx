import { useEffect, useState, createContext, useRef } from "react";
import clsx from "clsx";

import { defaultTypeFalse, defaultTypeTrue } from "@/utils/status";
import { api } from "@/utils/http";
import { Filter, Pokemon } from "@/models";
import { BaseInfo } from "./components/BaseInfo";
import { SearchBar } from "./components/SearchBar";

import { BASE_URL } from "@/utils/const";

interface PokemonBaseList {
  pokemonList: Pokemon[];
  filter: Filter;
}

interface FilterContextInterface {
  updateKeywordFilter: Function;
  updateTypeFilter: Function;
  toggereAreaSelect: Function;
  updateAreaSelect: Function;
  filter: Filter;
}

export const FilterContext = createContext({} as FilterContextInterface);
const cache = {} as PokemonBaseList;

function usePokemon() {
  const [pokemonList, setPokemons] = useState<Pokemon[]>([]);

  const getData = async () => {
    return await api<Pokemon[]>(`${BASE_URL}data/pokemon.json`);
  };

  const decodeData = (data: Pokemon[]) => {
    for (let pokemon of data) {
      pokemon.locations = new Set(pokemon.locations);
    }
    setPokemons(data);
    return data;
  };

  useEffect(() => {
    (async () => {
      if (cache.pokemonList) {
        setPokemons(cache.pokemonList);
      } else {
        let data = await getData();
        data = decodeData(data);
        cache.pokemonList = data;
      }
    })();
  }, []);

  return pokemonList;
}

function PokemonBaseList({ pokemonList, filter }: PokemonBaseList) {
  return (
    <>
      {pokemonList.map((pm) => (
        <BaseInfo key={`${pm.link}`} pm={pm} filter={filter} />
      ))}
    </>
  );
}

function List() {
  const pokemonList = usePokemon();
  const [filter, setFilter] = useState({
    types: defaultTypeTrue,
    keyword: "",
    area: "全區域",
    areaSelector: false,
  });

  const updateKeywordFilter = (keyword: string) => {
    setFilter((filter: Filter) => {
      return { ...filter, keyword };
    });
  };

  const updateTypeFilter = (targetType: string) => {
    setFilter((filter: Filter) => {
      let { types } = filter;
      if (Object.values(types).every((bool) => bool)) {
        types = { ...defaultTypeFalse, ...{ [targetType]: true } };
      } else {
        types = { ...types, ...{ [targetType]: !types[targetType] } };
        if (Object.values(types).every((bool) => !bool)) {
          types = { ...defaultTypeTrue };
        }
      }
      return { ...filter, ...{ types } };
    });
  };

  const toggereAreaSelect = () => {
    setFilter((filter: Filter) => {
      return { ...filter, ...{ areaSelector: !filter.areaSelector } };
    });
  };

  const updateAreaSelect = (area: string) => {
    setFilter((filter: Filter) => {
      return {
        ...filter,
        ...{ area: area, areaSelector: false },
      };
    });
  };

  const context = {
    updateKeywordFilter,
    updateTypeFilter,
    toggereAreaSelect,
    updateAreaSelect,
    filter,
  };

  return (
    <FilterContext.Provider value={context}>
      <article className="flex flex-col justify-center items-center my-16 gap-8">
        <section className="w-5/6 max-w-5xl">
          <SearchBar />
        </section>
        <section
          className={clsx(
            "flex justify-center items-center flex-wrap content-center",
            "gap-x-2 gap-y-4 w-full md:w-5/6 max-w-5xl"
          )}>
          <PokemonBaseList pokemonList={pokemonList} filter={filter} />
        </section>
      </article>
    </FilterContext.Provider>
  );
}

export default List;
