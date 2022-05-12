import { MapProps } from "@/models";
import { Marker } from "../Marker";

export function getBossKey(id: number) {
  return `boss-${id}`;
}

export function Boss({ mapData, filter, updateKeywordFilter }: MapProps) {
  if (!filter.types.boss) {
    return <></>;
  }
  return (
    <>
      {mapData.boss.map((pm, i) => {
        const keyword = getBossKey(i);
        return (
          <Marker
            key={i}
            pm={pm}
            selected={filter.keyword === keyword}
            updateKeywordFilter={() => {
              updateKeywordFilter(keyword);
            }}
          />
        );
      })}
    </>
  );
}
