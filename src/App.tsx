// import { useState } from "react";

import pm025 from "./assets/image/icon/025.png";

interface Location {
  [propName: string]: number[];
}
interface Obtain {
  mode: string;
  location?: string | Location;
  remark?: string;
}

interface Pokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  obtain: Obtain[];
  stats: number[];
  alt_form?: string;
}

const pm: Pokemon = {
  id: 1,
  pid: 722,
  name: "木木梟",
  types: ["草", "飛行"],
  obtain: [
    {
      location: "0",
      mode: "拉苯博士贈送",
      remark: "最初的夥伴，3選1(只有一隻)",
    },
    {
      location: "0",
      mode: "拉苯博士贈送",
      remark: "完成主任務18後，最初的夥伴選擇火球鼠或水水獺時(只有一隻)",
    },
    {
      location: "4",
      mode: "野生",
      remark: "時空歪曲",
    },
  ],
  stats: [68, 55, 55, 50, 50, 42],
};

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24 bg-yellow-500 relative">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-green-500 absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={pm025}
            alt=""
            className="max-w-none w-24 absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
