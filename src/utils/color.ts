import clsx from "clsx";
import {
  BgFromClass,
  BgToClass,
  HoverBgToClass,
  HoverBgFromClass,
} from "../models";

export const bgTypeClass = ([from, to]: string[], hover = false) => {
  const fromClass = BgFromClass[from as keyof typeof BgFromClass];
  const toClass = BgToClass[(to ?? from) as keyof typeof BgToClass];
  const hoverFromClass =
    HoverBgFromClass[from as keyof typeof HoverBgFromClass];
  const hoverToClass =
    HoverBgToClass[(to ?? from) as keyof typeof HoverBgToClass];

  return hover
    ? clsx(hoverFromClass, hoverToClass)
    : clsx("bg-gradient-to-b", fromClass, toClass);
};
