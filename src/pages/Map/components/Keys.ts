import { BasePokemon } from "@/models";

export function getBossKey(pm: BasePokemon) {
  return `boss-${pm.link}`;
}

export function getPointKey(type: string, id: number) {
  return `${type}-${id}`;
}

export function checkKeywordType(type: string) {
  if (["respawn", "tree", "crystal"].includes(type)) {
    return "spawntables";
  }
  return type;
}
