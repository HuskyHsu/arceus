import { Pokemon } from "../Detail";
import { Radar } from "./RadarChart";

interface Props {
  pokemon: Pokemon;
}

export function BaseStats({ pokemon }: Props) {
  return (
    <>
      <h3 className="text-xl">種族值</h3>
      <ul className="flex flex-col items-center">
        <li className="w-60">
          <Radar stats={pokemon.stats} />
        </li>
        <li>total: {pokemon.stats.reduce((acc, curr) => acc + curr, 0)}</li>
      </ul>
    </>
  );
}
