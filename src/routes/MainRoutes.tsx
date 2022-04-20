import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";

import { List, Detail } from "@/pages";
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
        <Route path=":link" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
