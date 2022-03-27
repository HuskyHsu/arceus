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

export enum HoverBgFromClass {
  "蟲" = "hover:from-type-bug/60",
  "惡" = "hover:from-type-dark/60",
  "龍" = "hover:from-type-dragon/60",
  "電" = "hover:from-type-electric/60",
  "妖精" = "hover:from-type-fairy/60",
  "格鬥" = "hover:from-type-fighting/60",
  "火" = "hover:from-type-fire/60",
  "飛行" = "hover:from-type-flying/60",
  "幽靈" = "hover:from-type-ghost/60",
  "草" = "hover:from-type-grass/60",
  "地面" = "hover:from-type-ground/60",
  "冰" = "hover:from-type-ice/60",
  "一般" = "hover:from-type-normal/60",
  "毒" = "hover:from-type-poison/60",
  "超能力" = "hover:from-type-psychic/60",
  "岩石" = "hover:from-type-rock/60",
  "鋼" = "hover:from-type-steel/60",
  "水" = "hover:from-type-water/60",
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

export enum HoverBgToClass {
  "蟲" = "hover:to-type-bug/60",
  "惡" = "hover:to-type-dark/60",
  "龍" = "hover:to-type-dragon/60",
  "電" = "hover:to-type-electric/60",
  "妖精" = "hover:to-type-fairy/60",
  "格鬥" = "hover:to-type-fighting/60",
  "火" = "hover:to-type-fire/60",
  "飛行" = "hover:to-type-flying/60",
  "幽靈" = "hover:to-type-ghost/60",
  "草" = "hover:to-type-grass/60",
  "地面" = "hover:to-type-ground/60",
  "冰" = "hover:to-type-ice/60",
  "一般" = "hover:to-type-normal/60",
  "毒" = "hover:to-type-poison/60",
  "超能力" = "hover:to-type-psychic/60",
  "岩石" = "hover:to-type-rock/60",
  "鋼" = "hover:to-type-stee/60l",
  "水" = "hover:to-type-water/60",
}

export enum OutlineClass {
  "蟲" = "outline-type-bug/80",
  "惡" = "outline-type-dark/80",
  "龍" = "outline-type-dragon/80",
  "電" = "outline-type-electric/80",
  "妖精" = "outline-type-fairy/80",
  "格鬥" = "outline-type-fighting/80",
  "火" = "outline-type-fire/80",
  "飛行" = "outline-type-flying/80",
  "幽靈" = "outline-type-ghost/80",
  "草" = "outline-type-grass/80",
  "地面" = "outline-type-ground/80",
  "冰" = "outline-type-ice/80",
  "一般" = "outline-type-normal/80",
  "毒" = "outline-type-poison/80",
  "超能力" = "outline-type-psychic/80",
  "岩石" = "outline-type-rock/80",
  "鋼" = "outline-type-steel/80",
  "水" = "outline-type-water/80",
}
