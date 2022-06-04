import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga";

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

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname + location.search);
    ReactGA.initialize("G-D5W7V4RE1E");
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

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
