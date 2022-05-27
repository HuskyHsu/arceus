import { FilterContextInterface, MapData, MapInfoTypes } from "@/models";
import { keys } from "..";
import { LayerBase } from "./LayerBase";
import { BossMarker } from "./Marker";

interface MapProps {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

export function LayerBoss({ mapData, filterModel }: MapProps) {
  return (
    <LayerBase
      filterModel={filterModel}
      name={"定點頭目"}
      type={MapInfoTypes.boss}>
      <>
        {mapData.boss.map((boss, i) => {
          const keyword = keys.getBossKey(boss);
          const selected = keyword === filterModel.filter.keyword;

          return (
            <BossMarker
              key={i}
              pm={boss}
              updateKeywordFilter={() => {
                filterModel.updateKeywordFilter(keyword);
              }}
              selected={selected}
            />
          );
        })}
      </>
    </LayerBase>
  );
}
