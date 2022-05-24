import { useEffect, useState } from "react";

import { Filter, MapData } from "@/models";
import { api, BASE_URL } from "@/utils";

export const useMapData = (filter: Filter, updateKeywordFilter: Function) => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
    tree: [],
    crystal: [],
    boss: [],
    pmTable: {},
  });

  const getMapData = async (area: string) => {
    return await api<MapData>(`${BASE_URL}data/map/${area}.json`);
  };

  useEffect(() => {
    (async () => {
      const data = await getMapData(filter.area);
      setMapData(data);
    })();
  }, [filter.area]);

  return { mapData };
};
