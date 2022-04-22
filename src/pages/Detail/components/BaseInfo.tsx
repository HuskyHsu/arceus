import { useContext } from "react";

import { RadarChart, Table } from "@/components";
import { GetMethod } from "@/models";
import { PokemonContext } from "../Detail";

export function BaseInfo() {
  const pokemon = useContext(PokemonContext);

  const getMethodsFeilds = [
    {
      name: "地點",
      value: (method: GetMethod) => {
        if (method.location === undefined) {
          return "-";
        }
        if (typeof method.location === "object") {
          let locations = [];
          for (let key in method.location) {
            locations.push(
              <p key={key}>{`${key} : ${method.location[key]?.join()}`}</p>
            );
          }
          return locations;
        }
        return method.location;
      },
    },
    {
      name: "方式",
      value: (method: GetMethod) => method.mode,
    },
    {
      name: "條件",
      value: (method: GetMethod) => method.remark,
    },
  ];

  const itemsFeilds = [
    {
      name: "頭目",
      value: (items: Items) => {
        return items.boss ? "頭目" : "一般";
      },
    },
    {
      name: "道具",
      value: (items: Items) => items[1],
    },
    {
      name: "道具",
      value: (items: Items) => items[2],
    },
  ];

  interface ItemsBase {
    "1": string;
    "2": string;
  }

  interface Items extends ItemsBase {
    boss: boolean;
  }

  interface ItemsSource {
    boss: Items;
    normal: Items;
  }

  const items = pokemon.items.reduce<ItemsSource>(
    (acc, item, i) => {
      if (item.boss) {
        acc.boss[
          String((i % 2) + 1) as keyof ItemsBase
        ] = `${item.name}(${item["%"]}%)`;
      } else {
        acc.normal[
          String((i % 2) + 1) as keyof ItemsBase
        ] = `${item.name}(${item["%"]}%)`;
      }
      return acc;
    },
    {
      boss: { "1": "", "2": "null", boss: true },
      normal: { "1": "", "2": "null", boss: false },
    }
  );

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">
      <div className="">
        <h4 className="text-lg">取得方式</h4>
        <Table feilds={getMethodsFeilds} data={pokemon.getMethods} />
      </div>
      <div className="">
        <h4 className="text-lg mt-4">攜帶道具</h4>
        <Table
          feilds={itemsFeilds}
          data={["normal", "boss"].map(
            (type) => items[type as keyof ItemsSource]
          )}
        />
      </div>
      <div className="row-span-2">
        <h4 className="text-lg">種族值</h4>
        <RadarChart stats={pokemon.stats} />
      </div>
    </div>
  );
}
