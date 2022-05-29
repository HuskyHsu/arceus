import { LayerGroup, LayersControl } from "react-leaflet";
import {
  FilterContextInterface,
  MapInfoTypes,
  MapPointTypes,
  MapSetTypes,
} from "@/models";

interface Layer {
  children: JSX.Element;
  filterModel: FilterContextInterface;
  name: string;
  type: MapSetTypes | MapInfoTypes | MapPointTypes;
}

export function LayerBase({ children, filterModel, name, type }: Layer) {
  return (
    <LayersControl.Overlay name={name} checked={filterModel.filter.types[type]}>
      <LayerGroup
        eventHandlers={{
          add: () => {
            if (!filterModel.filter.types[type]) {
              filterModel.toggereTypeSelect(type);
            }
          },
          remove: () => {
            if (filterModel.filter.types[type]) {
              filterModel.toggereTypeSelect(type);
            }
          },
        }}>
        {children}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
