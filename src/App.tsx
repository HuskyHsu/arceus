// import { useState } from "react";

import pm025 from "./assets/image/icon/025.png";
import { ReactComponent as Electric } from "./assets/image/type/Electric.svg";

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
  id: 56,
  pid: 25,
  name: "皮卡丘",
  types: ["電"],
  obtain: [
    {
      location: {
        "1": [6],
        "2": [0],
        "3": [12],
      },
      mode: "野生",
    },
    {
      mode: "進化",
      remark: "由關係「還挺好」的「皮丘」進化",
    },
  ],
  stats: [35, 55, 40, 50, 50, 90],
};

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-2 bg-yellow-200">
        <div className="w-24 h-24  relative">
          <div className="w-20 h-20 rounded-full outline outline-2 outline-yellow-700 overflow-hidden bg-green-500 absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={pm025}
              alt=""
              className="max-w-none w-24 rounded-full absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span>皮卡丘</span>
          <span>#056</span>
          <span>
            <Electric />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
