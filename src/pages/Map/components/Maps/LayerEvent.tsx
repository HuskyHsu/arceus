import { FilterContextInterface, MapData, MapInfoTypes } from "@/models";
import { keys } from "..";
import { LayerBase } from "./LayerBase";
import { BossMarker } from "./Marker";

interface MapProps {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

export function LayerEvent({ mapData, filterModel }: MapProps) {
  const keywordInfo = filterModel.filter.keyword.split("-");
  return (
    <LayerBase
      filterModel={filterModel}
      name={"任務事件"}
      type={MapInfoTypes.event}>
      <>
        {mapData.event.map((boss, i) => {
          let selected = false;
          const keyword = keys.getBossKey(boss);
          if (keywordInfo.length >= 2) {
            selected = keywordInfo[1] === boss.link;
          }

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
