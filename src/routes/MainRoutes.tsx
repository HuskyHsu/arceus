import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import List from "@/pages/List";
import Expenses from "./expenses";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path="expenses" element={<Expenses />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
