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

export interface Filter {
  types: Set<string>;
  keyword: string;
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

export enum BgFromClass {
  "蟲" = "from-type-bug/60",
  "惡" = "from-type-dark/60",
  "龍" = "from-type-dragon/60",
  "電" = "from-type-electric/60",
  "妖精" = "from-type-fairy/60",
  "格鬥" = "from-type-fighting/60",
  "火" = "from-type-fire/60",
  "飛行" = "from-type-flying/60",
  "幽靈" = "from-type-ghost/60",
  "草" = "from-type-grass/60",
  "地面" = "from-type-ground/60",
  "冰" = "from-type-ice/60",
  "一般" = "from-type-normal/60",
  "毒" = "from-type-poison/60",
  "超能力" = "from-type-psychic/60",
  "岩石" = "from-type-rock/60",
  "鋼" = "from-type-steel/60",
  "水" = "from-type-water/60",
}

export enum BeforeBgFromClass {
  "蟲" = "before:from-type-bug",
  "惡" = "before:from-type-dark",
  "龍" = "before:from-type-dragon",
  "電" = "before:from-type-electric",
  "妖精" = "before:from-type-fairy",
  "格鬥" = "before:from-type-fighting",
  "火" = "before:from-type-fire",
  "飛行" = "before:from-type-flying",
  "幽靈" = "before:from-type-ghost",
  "草" = "before:from-type-grass",
  "地面" = "before:from-type-ground",
  "冰" = "before:from-type-ice",
  "一般" = "before:from-type-normal",
  "毒" = "before:from-type-poison",
  "超能力" = "before:from-type-psychic",
  "岩石" = "before:from-type-rock",
  "鋼" = "before:from-type-steel",
  "水" = "before:from-type-water",
}

export enum BgToClass {
  "蟲" = "to-type-bug/60",
  "惡" = "to-type-dark/60",
  "龍" = "to-type-dragon/60",
  "電" = "to-type-electric/60",
  "妖精" = "to-type-fairy/60",
  "格鬥" = "to-type-fighting/60",
  "火" = "to-type-fire/60",
  "飛行" = "to-type-flying/60",
  "幽靈" = "to-type-ghost/60",
  "草" = "to-type-grass/60",
  "地面" = "to-type-ground/60",
  "冰" = "to-type-ice/60",
  "一般" = "to-type-normal/60",
  "毒" = "to-type-poison/60",
  "超能力" = "to-type-psychic/60",
  "岩石" = "to-type-rock/60",
  "鋼" = "to-type-stee/60l",
  "水" = "to-type-water/60",
}

export enum BeforeBgToClass {
  "蟲" = "before:to-type-bug",
  "惡" = "before:to-type-dark",
  "龍" = "before:to-type-dragon",
  "電" = "before:to-type-electric",
  "妖精" = "before:to-type-fairy",
  "格鬥" = "before:to-type-fighting",
  "火" = "before:to-type-fire",
  "飛行" = "before:to-type-flying",
  "幽靈" = "before:to-type-ghost",
  "草" = "before:to-type-grass",
  "地面" = "before:to-type-ground",
  "冰" = "before:to-type-ice",
  "一般" = "before:to-type-normal",
  "毒" = "before:to-type-poison",
  "超能力" = "before:to-type-psychic",
  "岩石" = "before:to-type-rock",
  "鋼" = "before:to-type-steel",
  "水" = "before:to-type-water",
}
