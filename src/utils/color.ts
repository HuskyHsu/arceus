import clsx from "clsx";
import {
  BgFromClass,
  BgToClass,
  BeforeBgFromClass,
  BeforeBgToClass,
} from "../models";

export const bgTypeClass = ([from, to]: string[], before = false) => {
  const fromClass = BgFromClass[from as keyof typeof BgFromClass];
  const toClass = BgToClass[(to ?? from) as keyof typeof BgToClass];
  const hoverFromClass =
    BeforeBgFromClass[from as keyof typeof BeforeBgFromClass];
  const hoverToClass =
    BeforeBgToClass[(to ?? from) as keyof typeof BeforeBgToClass];

  return before
    ? clsx("bg-gradient-to-b", hoverFromClass, hoverToClass)
    : clsx("bg-gradient-to-b", fromClass, toClass);
};
