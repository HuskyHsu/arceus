import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";

import { List, Detail, Map } from "@/pages";
import {
  usePokemon,
  useFilter,
  defaultTypeTrue,
  defaultCatchTypeTrue,
} from "@/utils";
import { MethodTypes } from "@/models";

function MainRouter() {
  const pokemonList = usePokemon();

  const allTypes = {
    ...defaultTypeTrue,
    ...defaultCatchTypeTrue,
    [MethodTypes.event]: true,
  };

  const filterModel = useFilter(undefined, allTypes);

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
        <Route index element={<Map pokemonList={pokemonList} />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
