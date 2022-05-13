import { TypeIcon } from "@/components";
import { BaseProps } from "@/models";

export function Types({ pm }: BaseProps) {
  if (pm.types.length === 1) {
    return <TypeIcon type={pm.types[0]} />;
  }
  return (
    <li className="flex gap-1">
      {
        <>
          <TypeIcon type={pm.types[0]} />
          <TypeIcon type={pm.types[1]} />
        </>
      }
    </li>
  );
}
