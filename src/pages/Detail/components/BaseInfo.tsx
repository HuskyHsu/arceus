import { useContext } from "react";

import { RadarChart, Table } from "@/components";
import { GetMethod, Item } from "@/models";
import { getTypeColor } from "@/utils";
import { PokemonContext } from "../Detail";

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

const formatItems = (items: Item[]) => {
  const newItems = items.reduce<ItemsSource>(
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
      boss: { "1": "", "2": "", boss: true },
      normal: { "1": "", "2": "", boss: false },
    }
  );

  return ["normal", "boss"].map((type) => newItems[type as keyof ItemsSource]);
};

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
      name: "道具一",
      value: (items: Items) => items[1] || "-",
    },
    {
      name: "道具二",
      value: (items: Items) => items[2] || "-",
    },
  ];

  const items = formatItems(pokemon.items);

  return (
    <div className="flex flex-col md:grid md:grid-rows-5 md:grid-cols-3 gap-2">
      <div className="md:col-span-2 md:row-span-3">
        <h4 className="text-lg">取得方式</h4>
        <Table feilds={getMethodsFeilds} data={pokemon.getMethods} />
      </div>
      <div className="md:row-span-5 order-2 md:order-1">
        <h4 className="text-lg">種族值</h4>
        <RadarChart
          stats={pokemon.stats}
          color={getTypeColor(pokemon.types[0])}
        />
      </div>
      <div className="md:col-span-2 md:row-span-2 order-1 md:order-2">
        <h4 className="text-lg mt-4">攜帶道具</h4>
        <Table feilds={itemsFeilds} data={items} />
      </div>
    </div>
  );
}
