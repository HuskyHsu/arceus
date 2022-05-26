import { FilterContextInterface, MapData, MapInfoTypes } from "@/models";
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
          let selected = false;
          if (filterModel.filter.keyword.startsWith("boss-")) {
            selected = boss.link === filterModel.filter.keyword.split("-")[1];
          }
          return (
            <BossMarker
              key={i}
              pm={boss}
              updateKeywordFilter={() => {
                const keyword = `boss-${boss.link}`;
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
