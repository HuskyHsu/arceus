import allPM from "./data/pokemon_.json";

import { BaseInfo } from "./components/BaseInfo";
import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <article className="flex flex-col justify-center items-center my-20 gap-8">
      <section className="w-5/6 max-w-xl">
        <SearchBar />
      </section>
      <section className="flex justify-center items-center flex-wrap content-center gap-x-4 gap-y-12 w-full md:w-5/6 max-w-4xl">
        {allPM.map((pm) => (
          <BaseInfo key={`${pm.pid}${pm.alt_form ?? ""}`} pm={pm} />
        ))}
      </section>
    </article>
  );
}

export default App;
