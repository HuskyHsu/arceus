import { useEffect, useState } from "react";
import clsx from "clsx";

import { defaultTypeTrue } from "./utils/status";
import { api } from "./data";
import { Pokemon } from "./models";
import { BaseInfo } from "./components/BaseInfo";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [filter, setFilter] = useState({
    types: defaultTypeTrue,
    keyword: "",
    area: "全區域",
    areaSelector: false,
  });

  useEffect(() => {
    api<Pokemon[]>("/arceus/data/pokemon.json").then((data) => {
      setPokemons(data);
    });
  }, []);

  return (
    <article className="flex flex-col justify-center items-center my-16 gap-8">
      <section className="w-5/6 max-w-5xl">
        <SearchBar setFilter={setFilter} filter={filter} />
      </section>
      <section
        className={clsx(
          "flex justify-center items-center flex-wrap content-center",
          "gap-x-2 gap-y-4 w-full md:w-5/6 max-w-5xl"
        )}>
        {pokemons.map((pm) => (
          <BaseInfo
            key={`${pm.pid}${pm.alt_form ?? ""}`}
            pm={pm}
            filter={filter}
          />
        ))}
      </section>
    </article>
  );
}

export default App;
