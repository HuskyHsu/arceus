import { ImageOverlay, MapContainer } from "react-leaflet";
import { CRS } from "leaflet";

import { BASE_URL } from "@/utils";
import { FilterContextInterface } from "@/models";

export interface Props {
  children: JSX.Element;
  filterModel: FilterContextInterface;
}

export function Base({ children, filterModel }: Props) {
  const isMobile = window.screen.width < 768;
  return (
    <MapContainer
      center={[512, 512]}
      zoom={isMobile ? -1.5 : -0.5}
      maxBounds={[
        [0, 0],
        [1024, 1024],
      ]}
      crs={CRS.Simple}
      minZoom={isMobile ? -2 : -1}
      maxZoom={2}
      zoomSnap={0.5}
      zoomDelta={0.5}
      wheelPxPerZoomLevel={120}
      className="h-full w-full">
      <ImageOverlay
        url={`${BASE_URL}image/map/${filterModel.filter.area}_LA.png`}
        bounds={[
          [0, 0],
          [1024, 1024],
        ]}
      />
      {children}
    </MapContainer>
  );
}
