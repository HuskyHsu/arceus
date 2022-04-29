import { useContext } from "react";

import { Move, levelingUpMove } from "@/models";
import { TypeIcon, Table } from "@/components";
import { PokemonContext } from "../Detail";

export function LevelingUp() {
  const feilds = [
    {
      name: "等級",
      value: (move: levelingUpMove) => (move.learn < 0 ? "進化" : move.learn),
      width: "w-1/12",
    },
    {
      name: "精通",
      value: (move: levelingUpMove) => move.mastery,
      width: "w-1/12",
    },
    {
      name: "招式",
      value: (move: levelingUpMove) => move.name,
      width: "w-1/12",
    },
    {
      name: "屬性",
      value: (move: levelingUpMove) => (
        <TypeIcon type={move.type} className="w-6 h-6" />
      ),
      width: "w-1/12",
    },
    {
      name: "分類",
      value: (move: levelingUpMove) => move.category,
      width: "w-1/12",
    },
    {
      name: "威力",
      value: (move: levelingUpMove) => move.power,
      width: "w-1/12",
    },
    {
      name: "命中",
      value: (move: levelingUpMove) => move.accuracy,
      width: "w-1/12",
    },
    {
      name: "PP",
      value: (move: levelingUpMove) => move.PP,
      width: "w-1/12",
    },
  ];

  const pokemon = useContext(PokemonContext);
  return <Table feilds={feilds} data={pokemon.learnset.levelingUp} />;
}

export function Tutoring() {
  const feilds = [
    {
      name: "招式",
      value: (move: Move) => move.name,
      width: "w-2/12",
    },
    {
      name: "屬性",
      value: (move: Move) => <TypeIcon type={move.type} className="w-6 h-6" />,
      width: "w-2/12",
    },
    {
      name: "分類",
      value: (move: Move) => move.category,
      width: "w-2/12",
    },
    {
      name: "威力",
      value: (move: Move) => move.power,
      width: "w-2/12",
    },
    {
      name: "命中",
      value: (move: Move) => move.accuracy,
      width: "w-2/12",
    },
    {
      name: "PP",
      value: (move: Move) => move.PP,
      width: "w-2/12",
    },
  ];

  const pokemon = useContext(PokemonContext);
  return <Table feilds={feilds} data={pokemon.learnset.tutoring} />;
}
