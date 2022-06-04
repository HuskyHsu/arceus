import { Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

import Layout from "@/components/Layout";
import { List, Detail, Map } from "@/pages";
import {
  usePokemon,
  useFilter,
  defaultTypeTrue,
  defaultCatchTypeTrue,
} from "@/utils";
import { MethodTypes } from "@/models";
import { useEffect } from "react";

function MainRouter() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-SDZV89RD8L");
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    });
    if (location.search) {
      ReactGA.event({
        category: location.pathname,
        action: location.search,
      });
    }
  }, [location]);

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
