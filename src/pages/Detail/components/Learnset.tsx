import { useContext } from "react";

import { Move, levelingUpMove } from "@/models";
import { TypeIcon } from "@/components";
import { PokemonContext } from "../Detail";

interface Feild {
  name: string;
  value: Function;
}

interface Props {
  feilds: Feild[];
  moveSourceType: string;
}

function MoveTable({ feilds, moveSourceType }: Props) {
  const pokemon = useContext(PokemonContext);
  const moves =
    moveSourceType === "levelingUp"
      ? pokemon.learnset.levelingUp
      : pokemon.learnset.tutoring;

  return (
    <table className="table-auto w-full text-left text-sm whitespace-no-wrap">
      <thead>
        <tr>
          {feilds.map((feild) => (
            <th
              key={feild.name}
              className="px-2 py-1 title-font tracking-wider text-gray-900 bg-gray-100">
              {feild.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {moves.map((move, i) => (
          <tr key={i}>
            {feilds.map((feild) => (
              <td
                key={feild.name}
                className="border-t-2 border-gray-200 px-2 py-1">
                {feild.value(move)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LevelingUp() {
  const feilds = [
    {
      name: "等級",
      value: (move: levelingUpMove) => (move.learn < 0 ? "進化" : move.learn),
    },
    {
      name: "精通",
      value: (move: levelingUpMove) => move.mastery,
    },
    {
      name: "招式",
      value: (move: levelingUpMove) => move.name,
    },
    {
      name: "屬性",
      value: (move: levelingUpMove) => (
        <TypeIcon type={move.type} className="w-6 h-6" />
      ),
    },
    {
      name: "分類",
      value: (move: levelingUpMove) => move.category,
    },
    {
      name: "威力",
      value: (move: levelingUpMove) => move.power,
    },
    {
      name: "命中",
      value: (move: levelingUpMove) => move.accuracy,
    },
    {
      name: "PP",
      value: (move: levelingUpMove) => move.PP,
    },
  ];

  return <MoveTable feilds={feilds} moveSourceType={"levelingUp"} />;
}

export function Tutoring() {
  const feilds = [
    {
      name: "招式",
      value: (move: Move) => move.name,
    },
    {
      name: "屬性",
      value: (move: Move) => <TypeIcon type={move.type} className="w-6 h-6" />,
    },
    {
      name: "分類",
      value: (move: Move) => move.category,
    },
    {
      name: "威力",
      value: (move: Move) => move.power,
    },
    {
      name: "命中",
      value: (move: Move) => move.accuracy,
    },
    {
      name: "PP",
      value: (move: Move) => move.PP,
    },
  ];

  return <MoveTable feilds={feilds} moveSourceType={"tutoring"} />;
}
