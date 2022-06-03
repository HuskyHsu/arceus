import { useEffect, useState } from "react";

import {
  api,
  defaultTypeTrue,
  defaultTypeFalse,
  BASE_URL,
  defaultCatchTypeTrue,
  defaultCatchTypeFalse,
} from "@/utils";
import { Pokemon, Filter, TypeMap, CatchType, MethodTypes } from "@/models";

export function usePokemon() {
  const [pokemonList, setPokemons] = useState<Pokemon[]>([]);

  const getData = async () => {
    return await api<Pokemon[]>(`${BASE_URL}data/pokemon.json`);
  };

  useEffect(() => {
    (async () => {
      let data = await getData();
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
      if (Object.keys(TypeMap).every((type) => types[type])) {
        types = { ...types, ...defaultTypeFalse, ...{ [targetType]: true } };
      } else {
        types = { ...types, ...{ [targetType]: !types[targetType] } };
        if (Object.keys(TypeMap).every((type) => !types[type])) {
          types = { ...types, ...defaultTypeTrue };
        }
      }
      return { ...filter, ...{ types } };
    });
  };

  const updateCatchTypeFilter = (targetType: string) => {
    setFilter((filter: Filter) => {
      let { types } = filter;
      if (
        Object.keys(CatchType).every((type) => types[type]) &&
        types[MethodTypes.event]
      ) {
        types = {
          ...types,
          ...defaultCatchTypeFalse,
          [MethodTypes.event]: false,
          ...{ [targetType]: true },
        };
      } else {
        types = { ...types, ...{ [targetType]: !types[targetType] } };
        if (
          Object.keys(CatchType).every((type) => !types[type]) &&
          !types[MethodTypes.event]
        ) {
          types = {
            ...types,
            ...defaultCatchTypeTrue,
            [MethodTypes.event]: true,
          };
        }
      }
      return { ...filter, ...{ types } };
    });
  };

  const toggereTypeSelect = (targetType: string) => {
    setFilter((filter: Filter) => {
      let { types } = filter;
      types = { ...types, ...{ [targetType]: !types[targetType] } };
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
    updateCatchTypeFilter,
    toggereTypeSelect,
    toggereAreaSelect,
    updateAreaSelect,
  };
}
