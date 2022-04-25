import clsx from "clsx";

import { BaseProps } from "@/models";
import { bgTypeClass } from "@/utils/color";
import { BASE_URL } from "@/utils/const";

interface Props extends BaseProps {
  size?: string;
  style?: string;
}

export function Avatars({ pm, style = "", size = "big" }: Props) {
  const center =
    "absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2";
  const imgPath = `${BASE_URL}image/icon/${pm.link}.png`;

  return (
    <header
      className={clsx("relative", size === "small" ? "w-12 h-12" : "w-24 h-24")}
    >
      <div
        className={clsx(
          "outline-white",
          bgTypeClass(pm.types),
          "rounded-full overflow-hidden",
          "group-hover:outline group-hover:outline-4",
          center,
          "transition-all",
          size === "small" ? "w-10 h-10" : "w-20 h-20 outline-0",
          style
        )}
      >
        <img
          src={imgPath}
          loading="lazy"
          alt=""
          className={clsx(
            "max-w-none rounded-full",
            center,
            size === "small" ? "w-12 h-12" : "w-24 h-24"
          )}
        />
      </div>
    </header>
  );
}
