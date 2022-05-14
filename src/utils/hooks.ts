import { useEffect, useState } from "react";

import { api, defaultTypeTrue, defaultTypeFalse, BASE_URL } from "@/utils";
import { Pokemon, Filter } from "@/models";

export function usePokemon() {
  const [pokemonList, setPokemons] = useState<Pokemon[]>([]);

  const getData = async () => {
    return await api<Pokemon[]>(`${BASE_URL}data/pokemon.json`);
  };

  const decodeData = (data: Pokemon[]) => {
    for (let pokemon of data) {
      pokemon.locations = new Set(pokemon.locations);
    }
    return data;
  };

  useEffect(() => {
    (async () => {
      let data = await getData();
      data = decodeData(data);
      setPokemons(data);
    })();
  }, []);

  return pokemonList;
}

export function useFilter(
  area = "全區域",
  displayTypes = defaultTypeTrue,
  keyword = ""
) {
  const [filter, setFilter] = useState({
    types: displayTypes,
    keyword: keyword,
    area: area,
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

  return {
    filter,
    updateKeywordFilter,
    updateTypeFilter,
    toggereAreaSelect,
    updateAreaSelect,
  };
}
