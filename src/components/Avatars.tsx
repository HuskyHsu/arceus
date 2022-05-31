import clsx from "clsx";

import { BaseProps } from "@/models";
import { bgTypeClass } from "@/utils/color";
import { BASE_URL } from "@/utils/const";

interface Props extends BaseProps {
  size?: string;
  style?: string;
  imgStyle?: string;
}

export function Avatars({ pm, style = "", size = "L", imgStyle = "" }: Props) {
  const center =
    "absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2";
  const imgPath = `${BASE_URL}image/icon/${pm.linkPid}.png`;

  let sizeClass = "";
  let sizeClassBg = "";
  if (size == "L") {
    sizeClass = "w-24 h-24";
    sizeClassBg = "w-20 h-20 ring-0";
  } else if (size == "M") {
    sizeClass = "w-12 h-12";
    sizeClassBg = "w-10 h-10";
  } else if (size == "S") {
    sizeClass = "w-10 h-10";
    sizeClassBg = "w-8 h-8 ring-2";
  }

  return (
    <header className={clsx("relative", sizeClass)}>
      <div
        className={clsx(
          "ring-white",
          bgTypeClass(pm.types),
          "rounded-full overflow-hidden",
          "group-hover:ring-4",
          center,
          "transition-all",
          sizeClassBg,
          style
        )}>
        <img
          src={imgPath}
          loading="lazy"
          alt=""
          className={clsx(
            "max-w-none rounded-full",
            center,
            sizeClass,
            imgStyle
          )}
        />
      </div>
    </header>
  );
}
