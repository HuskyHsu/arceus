import clsx from "clsx";

import { Props, OutlineClass, BgFromClass, BgToClass } from "../models";
import { bgTypeClass } from "../utils/color";
import { zeroFilled } from "../utils/id";

enum Suffix {
  "洗翠" = "H",
  "砂土蓑衣" = "G",
  "垃圾蓑衣" = "S",
  "晴天形態" = "S",
  "白條紋" = "W",
  "雌性" = "F",
  "阿羅拉" = "A",
  "加熱洛托姆" = "O",
  "清洗洛托姆" = "W",
  "結冰洛托姆" = "R",
  "旋轉洛托姆" = "F",
  "切割洛托姆" = "L",
  "靈獸形態" = "T",
  "起源形態" = "O",
  "天空形態" = "S",
}

export function Avatars({ pm }: Props) {
  const suffixes = Suffix[pm.alt_form as keyof typeof Suffix] ?? "";
  const outlineClass = OutlineClass[pm.types[0] as keyof typeof OutlineClass];

  const center =
    "absolute transform inset-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <header className="w-24 h-24 relative">
      <div
        className={clsx(
          "outline-white",
          bgTypeClass(pm.types),
          "w-20 h-20 rounded-full outline-0 overflow-hidden",
          "group-hover:outline group-hover:outline-4",
          center
        )}
      >
        <img
          src={`/arceus/image/icon/${zeroFilled(pm.pid)}${suffixes}.png`}
          loading="lazy"
          alt=""
          className={clsx("max-w-none w-24 rounded-full", center)}
        />
      </div>
    </header>
  );
}
