import { LayersControl, Pane } from "react-leaflet";

import {
  FilterContextInterface,
  MapData,
  MapPointTypes,
  MapSetTypes,
} from "@/models";
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
          <LayerSphere mapData={mapData} filterModel={filterModel} />
        </Pane>
        <Pane name="point">
          <LayersControl position="topright" collapsed={false}>
            <LayerBoss mapData={mapData} filterModel={filterModel} />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"重生定點"}
              type={MapSetTypes.respawn}
              color={["#ca8a04", "#fde047"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"搖晃的樹"}
              type={MapSetTypes.tree}
              color={["#059669", "#6ee7b7"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"搖晃的礦"}
              type={MapSetTypes.crystal}
              color={["#57534e", "#d6d3d1"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"107幽火"}
              type={MapPointTypes.spiritomb}
              color={["#673ced", "#ffadff"]}
            />
            <LayerPoints
              mapData={mapData}
              filterModel={filterModel}
              name={"未知圖騰"}
              type={MapPointTypes.unown}
              color={["#000000", "#ffffff"]}
            />
          </LayersControl>
        </Pane>
      </>
    </Base>
  );
}
