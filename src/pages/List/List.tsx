import { createContext } from "react";
import clsx from "clsx";

import { BaseInfo, SearchBar } from "./components";
import { BasePokemon, FilterContextInterface } from "@/models";

interface PokemonBaseList {
  pokemonList: BasePokemon[];
}

interface Porps extends PokemonBaseList {
  filterModel: FilterContextInterface;
}

export const FilterContext = createContext({} as FilterContextInterface);

function PokemonBaseList({ pokemonList }: PokemonBaseList) {
  return (
    <>
      {pokemonList.map((pm) => (
        <BaseInfo key={`${pm.link}`} pm={pm} />
      ))}
    </>
  );
}

function List({ pokemonList, filterModel }: Porps) {
  return (
    <FilterContext.Provider value={filterModel}>
      <article className="flex flex-col justify-center items-center my-16 gap-8">
        <section className="w-5/6 max-w-5xl">
          <SearchBar />
        </section>
        <section
          className={clsx(
            "flex justify-center items-center flex-wrap content-center",
            "gap-4 w-full md:w-5/6 max-w-5xl"
          )}>
          <PokemonBaseList pokemonList={pokemonList} />
        </section>
      </article>
    </FilterContext.Provider>
  );
}

export default List;
