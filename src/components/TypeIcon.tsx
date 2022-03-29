import { TypeMap } from "../models";

interface TypeIconInterface {
  type: string;
  className?: string;
  button?: boolean;
  clickFn?: React.MouseEventHandler<HTMLButtonElement>;
}

export const TypeIcon = ({
  type,
  className = "w-5 h-5",
  button = false,
  clickFn = () => {},
}: TypeIconInterface) => {
  if (button) {
    return (
      <button type="button" onClick={clickFn}>
        <img
          src={`/arceus/image/type/${
            TypeMap[type as keyof typeof TypeMap]
          }.svg`}
          alt={type}
          className={className}
          key={type}
        />
      </button>
    );
  }
  return (
    <img
      src={`/arceus/image/type/${TypeMap[type as keyof typeof TypeMap]}.svg`}
      alt={type}
      className={className}
      key={type}
    />
  );
};
