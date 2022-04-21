import { Pokemon } from "@/models";
import { RadarChart } from "@/components/RadarChart";

interface Props {
  pokemon: Pokemon;
}

export function BaseStats({ pokemon }: Props) {
  return (
    <>
      {/* <h3 className="text-xl">種族值</h3> */}
      <ul className="flex">
        <li className="w-60">
          <RadarChart stats={pokemon.stats} />
        </li>
        <li>total：{pokemon.stats.reduce((acc, curr) => acc + curr, 0)}</li>
      </ul>
    </>
  );
}
