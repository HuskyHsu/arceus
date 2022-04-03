import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Pokemon } from "@/models";
import { api } from "@/utils/http";
import { BASE_URL } from "@/utils/const";

function Detail() {
  let { pid } = useParams();
  pid = "724";

  const getData = async () => {
    return await api<Pokemon[]>(`${BASE_URL}data/pokemon/${pid}.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
    })();
  }, []);

  return (
    <>
      <article className="grid grid-cols-2 gap-4">
        <section>個體質</section>
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
