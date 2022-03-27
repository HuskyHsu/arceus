import { TypeMap } from "../models";

export const GetTypeIcon = (type: string) => {
  const iconSize = "w-5 h-5";
  return (
    <img
      src={`/arceus/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
      alt={type}
      className={iconSize}
    />
  );
};
