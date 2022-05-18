import { useRef, WheelEvent } from "react";

import { MapProps } from "@/models";
import { BASE_URL } from "@/utils";
import * as Maps from "./Maps";

export function MapDom({ mapData, filter, updateKeywordFilter }: MapProps) {
  const divRef = useRef<HTMLDivElement>(null);
  function zoomEvent(e: WheelEvent<HTMLDivElement>) {
    if (divRef.current == null) {
      return;
    }
    const scale = Number(
      divRef.current.style.transform.replace("scale(", "").replace(")", "")
    );
    const currPercent = divRef.current.style.transformOrigin
      .replace(/%/g, "")
      .replace(" 0px", "")
      .split(" ")
      .map(Number)
      .map((n) => n / 100);

    const originSize = divRef.current.clientWidth;
    const currentSize = scale * originSize;

    const viewBox = [
      originSize * currPercent[0] * (scale - 1),
      originSize * currPercent[1] * (scale - 1),
    ];

    const xPercent = ((e.clientX + viewBox[0]) / currentSize) * 100;
    const yPercent = ((e.clientY + viewBox[1]) / currentSize) * 100;

    if (scale < 0.9 && e.deltaY > 0) {
      return;
    }

    const nextScale = scale + (e.deltaY > 0 ? -0.2 : 0.2);
    let nextPercent = [xPercent, yPercent].map(Math.round);

    divRef.current.style.transform = `scale(${nextScale})`;
    divRef.current.style.transformOrigin = `${nextPercent[0]}% ${nextPercent[1]}% 0px`;
  }

  return (
    <div
      className="relative aspect-square bg-no-repeat bg-cover overflow-clip"
      style={{
        backgroundImage: `url(${BASE_URL}image/map/${filter.area}_LA.png)`,
        height: "100vmin",
        maxHeight: "100vmin",
        transform: "scale(1)",
        transformOrigin: "50% 50% 0px",
      }}
      ref={divRef}
      onWheel={zoomEvent}>
      <Maps.Points
        mapData={mapData}
        filter={filter}
        type={"respawn"}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Points
        mapData={mapData}
        filter={filter}
        type={"tree"}
        color={"bg-emerald-300/50 border-emerald-600"}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Points
        mapData={mapData}
        filter={filter}
        type={"crystal"}
        color={"bg-stone-300/50 border-stone-600"}
        updateKeywordFilter={updateKeywordFilter}
      />
      <Maps.Boss
        mapData={mapData}
        filter={filter}
        type={"boss"}
        updateKeywordFilter={updateKeywordFilter}
      />
    </div>
  );
}
