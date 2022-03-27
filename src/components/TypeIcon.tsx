import { TypeMap } from "../models";

interface TypeIconInterface {
  type: string;
  iconSize?: string;
}

export const TypeIcon = ({ type, iconSize = "w-5 h-5" }: TypeIconInterface) => {
  return (
    <img
      src={`/arceus/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
      alt={type}
      className={iconSize}
      key={type}
    />
  );
};
