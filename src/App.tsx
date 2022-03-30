import { useEffect, useState } from "react";
import clsx from "clsx";

import { defaultTypeTrue } from "./utils/status";
import { api } from "./utils/http";
import { Pokemon } from "./models";
import { BaseInfo } from "./components/BaseInfo";
import { SearchBar } from "./components/SearchBar";

import { area } from "./data/area.json";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState({
    types: defaultTypeTrue,
    keyword: "",
    area: "全區域",
    areaSelector: false,
  });

  const getData = async () => {
    return await api<Pokemon[]>("/arceus/data/pokemon.json");
  };

  const decodeData = async () => {
    const data = await getData();
    for (let pokemon of data) {
      pokemon.locations = new Set(
        pokemon.obtain
          .map((obtain) => {
            if (typeof obtain.location === "string") {
              return obtain.location;
            } else if (typeof obtain.location === "object") {
              return Object.keys(obtain.location);
            }
          })
          .filter(Boolean)
          .flat()
          .map((location) => area[location as keyof typeof area])
      );
    }
    setPokemons(data);
  };

  useEffect(() => {
    decodeData();
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
