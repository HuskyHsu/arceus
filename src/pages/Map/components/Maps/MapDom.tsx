import { LayersControl, Pane } from "react-leaflet";

import { FilterContextInterface, MapData, MapSetTypes } from "@/models";
import { Base } from "./Base";
import { LayerSphere } from "./LayerSphere";
import { LayerBoss } from "./LayerBoss";
import { LayerPoints } from "./LayerPoints";

interface MapProps {
  mapData: MapData;
  filterModel: FilterContextInterface;
}

export function MapDom({ mapData, filterModel }: MapProps) {
  return (
    <Base filterModel={filterModel}>
      <>
        <Pane name="svgLayer" className="pointer-events-none">
          <LayerSphere
            mapData={mapData}
            keywordInfo={filterModel.filter.keyword.split("-")}
          />
        </Pane>
        <Pane name="point">
          <LayersControl position="topright" collapsed={false}>
            <LayerBoss mapData={mapData} filterModel={filterModel} />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"重生定點"}
              type={MapSetTypes.respawn}
              color={["rgb(202, 138, 4)", "rgb(253, 224, 71)"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"搖晃的樹"}
              type={MapSetTypes.tree}
              color={["rgb(5, 150, 105)", "rgb(110, 231, 183)"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"搖晃的礦"}
              type={MapSetTypes.crystal}
              color={["rgb(87, 83, 78)", "rgb(214, 211, 209)"]}
            />
          </LayersControl>
        </Pane>
      </>
    </Base>
  );
}
