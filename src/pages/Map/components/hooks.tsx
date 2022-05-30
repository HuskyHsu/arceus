import { useEffect, useState } from "react";

import { Filter, MapData } from "@/models";
import { api, BASE_URL } from "@/utils";
import { keys } from ".";

export const useMapData = (filter: Filter, updateKeywordFilter: Function) => {
  const [mapData, setMapData] = useState<MapData>({
    respawn: [],
    tree: [],
    crystal: [],
    boss: [],
    spiritomb: [],
    unown: [],
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
        const keywordInfo = filter.keyword.split("-");
        if (keywordInfo.length < 2) {
          const keyword = keys.getPointKey("respawn", data.respawn[0].id);
          updateKeywordFilter(keyword);
        } else if (keywordInfo.length === 3 || keywordInfo[0] === "pokemon") {
          const link = keywordInfo[1];
          if (
            data.pmTable[link] === undefined ||
            data.pmTable[link].spawntables.length === 0
          ) {
            return updateKeywordFilter("");
          }
          const tableId = data.pmTable[link].spawntables[0];
          updateKeywordFilter(["pokemon", link, tableId].join("-"));
        }
      }
    })();
  }, [filter.area]);

  return { mapData };
};
