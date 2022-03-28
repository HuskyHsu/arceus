import { useState } from "react";
import clsx from "clsx";

import allPM from "./data/pokemon_.json";

import { BaseInfo } from "./components/BaseInfo";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [filter, setFilter] = useState({
    type: [],
    keyword: "",
  });

  return (
    <article className="flex flex-col justify-center items-center my-16 gap-8">
      <section className="w-5/6 max-w-5xl">
        <SearchBar setFilter={setFilter} filter={filter} />
      </section>
      <section
        className={clsx(
          "flex justify-center items-center flex-wrap content-center",
          "gap-x-2 gap-y-4 w-full md:w-5/6 max-w-5xl"
        )}
      >
        {allPM.map((pm) => (
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
