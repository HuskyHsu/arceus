import { Props } from "../models";
import { Avatars } from "./Avatars";
import { GetTypeIcon } from "./TypeIcon";
import { zeroFilled } from "../utils/id";

function Types({ pm }: Props) {
  return (
    <li className="flex gap-1">
      {GetTypeIcon(pm.types[0])}
      {pm.types.length > 1 && GetTypeIcon(pm.types[1])}
    </li>
  );
}

function Name({ pm }: Props) {
  return (
    <li className="flex flex-col items-center gap-y-1">
      <span className="text-lg font-medium leading-none">{pm.name}</span>
      <span className="text-xs text-gray-500 font-thin">
        {pm.alt_form && `(${pm.alt_form})`}
      </span>
    </li>
  );
}

export function BaseInfo({ pm }: Props) {
  return (
    <div className="p-2">
      <Avatars pm={pm} />
      <ul className="h-14 flex flex-col justify-start items-center gap-y-2">
        <li className="text-gray-600 text-sm leading-none">
          #{zeroFilled(pm.id)}
        </li>
        <Types pm={pm} />
        <Name pm={pm} />
      </ul>
    </div>
  );
}
