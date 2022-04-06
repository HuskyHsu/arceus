import clsx from "clsx";

import { NameSuffix, Props } from "@/models";
import { bgTypeClass } from "@/utils/color";
import { zeroFilled } from "@/utils/id";
import { BASE_URL } from "@/utils/const";

export function Avatars({ pm }: Props) {
  const suffixes = NameSuffix[pm.altForm as keyof typeof NameSuffix] ?? "";

  const center =
    "absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2";
  const imgPath = `${BASE_URL}image/icon/${zeroFilled(pm.pid)}${suffixes}.png`;

  return (
    <header className="w-24 h-24 relative">
      <div
        className={clsx(
          "outline-white",
          bgTypeClass(pm.types),
          "w-20 h-20 rounded-full outline-0 overflow-hidden",
          "group-hover:outline group-hover:outline-4",
          center,
          "transition-all"
        )}>
        <img
          src={imgPath}
          loading="lazy"
          alt=""
          className={clsx("max-w-none w-24 rounded-full", center)}
        />
      </div>
    </header>
  );
}
