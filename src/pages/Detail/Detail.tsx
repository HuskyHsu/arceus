import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { Pokemon } from "@/models";
import { api } from "@/utils/http";
import { BASE_URL } from "@/utils/const";
import { Radar } from "./components/radarChart";

interface Info {
  types: string[];
  alt_form?: string;
  stats: number[];
}
interface Pokemon {
  id: number;
  pid: number;
  name: string;
  info: Info[];
}

const getData = async (pid: string) => {
  return await api<Pokemon>(`${BASE_URL}data/pokemon/${pid}.json`);
};

function Detail() {
  let { pid = "724" } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    pid: Number(pid),
    name: "",
    info: [
      {
        types: [],
        stats: [255, 255, 255, 255, 255, 255],
      },
    ],
  });

  useEffect(() => {
    (async () => {
      const data = await getData(pid);
      setPokemon(data);
    })();
  }, []);

  return (
    <>
      <article className="grid grid-cols-2 gap-4">
        <section>
          種族值
          <Radar stats={pokemon.info[0].stats} />
        </section>
        <section>(顯圖+名稱+屬性)</section>
        <section>出沒地點</section>
        <section>攜帶道具</section>
        <section>升等招式</section>
        <section>傳授招式</section>
        <section className="col-span-2">進化表</section>
      </article>
    </>
  );
}

export default Detail;
