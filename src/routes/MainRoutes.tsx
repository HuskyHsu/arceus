import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";

import { List, Detail, Map, Map_ } from "@/pages";
import { usePokemon, useFilter } from "@/utils";

function MainRouter() {
  const pokemonList = usePokemon();
  const filterModel = useFilter();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<List pokemonList={pokemonList} filterModel={filterModel} />}
        />
        <Route path=":link" element={<Detail pokemonList={pokemonList} />} />
      </Route>
      <Route path="/map" element={<Layout />}>
        <Route index element={<Map />} />
      </Route>
      <Route path="/map_" element={<Layout />}>
        <Route index element={<Map_ pokemonList={pokemonList} />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
