import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { Pokemon } from "@/models";
import { api } from "@/utils/http";
import { BASE_URL } from "@/utils/const";
import { Radar } from "./components/radarChart";
import clsx from "clsx";

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
        stats: [0, 0, 0, 0, 0, 0],
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
    <article className="flex flex-col justify-center items-center my-16">
      <article className="w-5/6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="">
          <div>
            <Radar stats={pokemon.info[0].stats} />
          </div>
        </section>
        <section className="">
          <div>
            (顯圖+名稱+屬性)
            <img
              src={`${BASE_URL}image/pokemon/0843_000_041_n.png`}
              loading="lazy"
              alt=""
              className={clsx("max-w-none w-96 rounded-full")}
            />
          </div>
        </section>
        <section className="">出沒地點</section>
        <section className="">攜帶道具</section>
        <section className="">升等招式</section>
        <section className="">傳授招式</section>
        <section className="md:col-span-2">進化表</section>
      </article>
    </article>
  );
}

export default Detail;
