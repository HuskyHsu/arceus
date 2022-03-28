import { TypeMap } from "../models";

interface TypeIconInterface {
  type: string;
  iconSize?: string;
  button?: boolean;
}

export const TypeIcon = ({
  type,
  iconSize = "w-5 h-5",
  button = false,
}: TypeIconInterface) => {
  if (button) {
    return (
      <button type="button">
        <img
          src={`/arceus/image/type/${
            TypeMap[type as keyof typeof TypeMap]
          }.svg`}
          alt={type}
          className={iconSize}
          key={type}
        />
      </button>
    );
  }
  return (
    <img
      src={`/arceus/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
      alt={type}
      className={iconSize}
      key={type}
    />
  );
};
