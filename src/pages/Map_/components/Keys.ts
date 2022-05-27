import { BasePokemon } from "@/models";

export function getBossKey(pm: BasePokemon) {
  return `boss-${pm.link}`;
}
