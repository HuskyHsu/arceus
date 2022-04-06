import { TypeMap } from "@/models";

export const defaultTypeFalse = Object.keys(TypeMap).reduce<
  Record<string, boolean>
>((acc, type) => {
  acc[type] = false;
  return acc;
}, {});

export const defaultTypeTrue = Object.keys(TypeMap).reduce<
  Record<string, boolean>
>((acc, type) => {
  acc[type] = true;
  return acc;
}, {});
