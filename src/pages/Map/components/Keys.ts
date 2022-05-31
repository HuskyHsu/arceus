import { BasePokemon } from "@/models";

export function getBossKey(pm: BasePokemon) {
  return `pokemon-${pm.link}`;
}

export function getPointKey(type: string, id: number | string) {
  return `${type}-${id}`;
}

export function checkKeywordType(type: string) {
  if (["respawn", "tree", "crystal"].includes(type)) {
    return "spawntables";
  }
  return type;
}
