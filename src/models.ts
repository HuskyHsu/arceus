interface Location {
  [propName: string]: number[] | undefined;
}

interface Obtain {
  mode: string;
  location?: string | Location;
  remark?: string;
}

export interface Pokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  obtain: Obtain[];
  stats: number[];
  alt_form?: string;
}

export interface Props {
  pm: Pokemon;
}

export enum TypeMap {
  "蟲" = "Bug",
  "惡" = "Dark",
  "龍" = "Dragon",
  "電" = "Electric",
  "妖精" = "Fairy",
  "格鬥" = "Fighting",
  "火" = "Fire",
  "飛行" = "Flying",
  "幽靈" = "Ghost",
  "草" = "Grass",
  "地面" = "Ground",
  "冰" = "Ice",
  "一般" = "Normal",
  "毒" = "Poison",
  "超能力" = "Psychic",
  "岩石" = "Rock",
  "鋼" = "Steel",
  "水" = "Water",
}

export enum BgClass {
  "蟲" = "bg-type-bug",
  "惡" = "bg-type-dark",
  "龍" = "bg-type-dragon",
  "電" = "bg-type-electric",
  "妖精" = "bg-type-fairy",
  "格鬥" = "bg-type-fighting",
  "火" = "bg-type-fire",
  "飛行" = "bg-type-flying",
  "幽靈" = "bg-type-ghost",
  "草" = "bg-type-grass",
  "地面" = "bg-type-ground",
  "冰" = "bg-type-ice",
  "一般" = "bg-type-normal",
  "毒" = "bg-type-poison",
  "超能力" = "bg-type-psychic",
  "岩石" = "bg-type-rock",
  "鋼" = "bg-type-steel",
  "水" = "bg-type-water",
}

export enum OutlineClass {
  "蟲" = "outline-type-bug",
  "惡" = "outline-type-dark",
  "龍" = "outline-type-dragon",
  "電" = "outline-type-electric",
  "妖精" = "outline-type-fairy",
  "格鬥" = "outline-type-fighting",
  "火" = "outline-type-fire",
  "飛行" = "outline-type-flying",
  "幽靈" = "outline-type-ghost",
  "草" = "outline-type-grass",
  "地面" = "outline-type-ground",
  "冰" = "outline-type-ice",
  "一般" = "outline-type-normal",
  "毒" = "outline-type-poison",
  "超能力" = "outline-type-psychic",
  "岩石" = "outline-type-rock",
  "鋼" = "outline-type-steel",
  "水" = "outline-type-water",
}
