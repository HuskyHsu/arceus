import { useContext } from "react";
import { Link } from "react-router-dom";

import areaMap from "@/data/area.json";
import { Icon, RadarChart, Table } from "@/components";
import {
  GetMethodCatch,
  GetMethodEvent,
  GetMethodEvolution,
  MethodTypes,
  Item,
} from "@/models";
import { getTypeColor } from "@/utils";
import { PokemonContext } from "../Detail";
import clsx from "clsx";

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
      name: "方式",
      value: (method: GetMethodCatch | GetMethodEvent | GetMethodEvolution) => {
        if (method.type === MethodTypes.event) {
          return "事件";
        } else if (method.type === MethodTypes.evolution) {
          return "進化";
        } else {
          return "捕捉";
        }
      },
      width: "w-2/12",
    },
    {
      name: "地點",
      value: (method: GetMethodCatch | GetMethodEvent | GetMethodEvolution) => {
        if (method.type !== MethodTypes.evolution) {
          return (
            <Link
              to={`/map?area=${method.location}&keyword=pokemon-${pokemon.link}`}>
              <span className={" text-blue-900 underline inline"}>
                {method.location}
              </span>
            </Link>
          );
        } else {
          return "";
        }
      },
      width: "w-3/12",
    },
    {
      name: "條件",
      value: (method: GetMethodCatch | GetMethodEvent | GetMethodEvolution) => {
        if (method.type !== MethodTypes.catch) {
          return method.remark;
        }
        return (
          <div className="flex ">
            {method.respawn && (
              <>
                <Icon.Ball className={clsx("h-7 w-8")} />
                {method.remark && (
                  <span className="text-xs pt-3">({method.remark})</span>
                )}
              </>
            )}
            {method.tree && <Icon.Tree className={clsx("h-7 w-8")} />}
            {method.crystal && <Icon.Crystal className={clsx("h-7 w-8")} />}
            {method.boss && <Icon.Boss className={clsx("h-7 w-8")} />}
            {method.distortion && (
              <Icon.Distortion className={clsx("h-7 w-8")} />
            )}
            {method.mass && <Icon.Star className={clsx("h-7 w-8")} />}
            {method.massive && <Icon.Stars className={clsx("h-7 w-8")} />}
          </div>
        );
      },
      width: "w-7/12",
    },
  ];

  const iconFeilds = [
    {
      name: "野生",
      value: () => <Icon.Ball className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">搖晃</span>
          <span>樹木</span>
        </>
      ),
      value: () => <Icon.Tree className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">搖晃</span>
          <span>礦石</span>
        </>
      ),
      value: () => <Icon.Crystal className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">定點</span>
          <span>頭目</span>
        </>
      ),
      value: () => <Icon.Boss className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">時空</span>
          <span>扭曲</span>
        </>
      ),
      value: () => <Icon.Distortion className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">大量</span>
          <span>出現</span>
        </>
      ),
      value: () => <Icon.Star className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
    {
      name: (
        <>
          <span className="block">大大大</span>
          <span>量出現</span>
        </>
      ),
      value: () => <Icon.Stars className="h-6 w-full" />,
      width: "w-1/12 text-xs",
    },
  ];

  const itemsFeilds = [
    {
      name: "頭目",
      value: (items: Items) => {
        return items.boss ? "頭目" : "一般";
      },
      width: "w-1/5",
    },
    {
      name: "道具一",
      value: (items: Items) => items[1] || "-",
      width: "w-2/5",
    },
    {
      name: "道具二",
      value: (items: Items) => items[2] || "-",
      width: "w-2/5",
    },
  ];

  const items = formatItems(pokemon.items);

  return (
    <div className="flex flex-col md:grid md:grid-rows-7 md:grid-cols-3 gap-2">
      <div className="md:col-span-2 md:row-span-4">
        <h4 className="text-lg">取得方式</h4>
        <Table<GetMethodCatch | GetMethodEvent | GetMethodEvolution>
          feilds={getMethodsFeilds}
          data={pokemon.getMethods}
        />
        <div className="mt-4">
          <h4 className="text-xs">圖例說明</h4>
          <Table feilds={iconFeilds} data={[{}]} headerCenter={true} />
        </div>
      </div>
      <div className="md:row-span-5 order-2 md:order-1">
        <h4 className="text-lg">種族值</h4>
        <RadarChart
          stats={pokemon.stats}
          color={getTypeColor(pokemon.types[0])}
        />
      </div>
      <div className="md:col-span-2 md:row-span-3 order-1 md:order-2">
        <h4 className="text-lg mt-4">攜帶道具</h4>
        <Table feilds={itemsFeilds} data={items} />
      </div>
    </div>
  );
}
