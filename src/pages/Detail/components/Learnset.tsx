import { useContext } from "react";

import { Move, levelingUpMove } from "@/models";
import { TypeIcon, Table } from "@/components";
import { PokemonContext } from "../Detail";

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

  const pokemon = useContext(PokemonContext);
  return <Table feilds={feilds} data={pokemon.learnset.levelingUp} />;
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

  const pokemon = useContext(PokemonContext);
  return <Table feilds={feilds} data={pokemon.learnset.tutoring} />;
}
