import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import List from "@/pages/List";
import Detail from "@/pages/Detail";

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<List />} />
        <Route path=":link" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default MainRouter;
