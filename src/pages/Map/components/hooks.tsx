import { useEffect, useState } from "react";

import { Filter, MapData } from "@/models";
import { api, BASE_URL } from "@/utils";
import { Maps } from ".";

export const useMapData = (filter: Filter, updateKeywordFilter: Function) => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
    tree: [],
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
      if (data.respawn.length > 0) {
        if (filter.keyword === "") {
          updateKeywordFilter(Maps.getKey("respawn", data.respawn[0].id));
        } else if (filter.keyword.startsWith("respawn-")) {
          updateKeywordFilter(Maps.getKey("respawn", data.respawn[0].id));
        } else {
          const link = filter.keyword.split("-")[1];
          if (
            data.pmTable[link] === undefined ||
            data.pmTable[link].length === 0
          ) {
            return updateKeywordFilter("");
          }
          const tableId = data.pmTable[link][0];
          updateKeywordFilter(`${filter.keyword}-${tableId}`);
        }
      }
    })();
  }, [filter.area]);

  return { mapData };
};
