export interface Location {
  [propName: string]: number[] | undefined;
}

export interface GetMethod {
  mode: string;
  location?: string | Location;
  remark?: string;
}

enum MoveCategory {
  "物理",
  "特殊",
  "變化",
}

export interface Move {
  id: number;
  name: string;
  type: TypeMap;
  category: MoveCategory;
  power: number;
  accuracy: number;
  PP: number;
  description: string;
  effect: string;
  agilePower: number;
  agileEffect: string;
  strongPower: number;
  strongAccuracy: number;
  strongEffect: string;
}

export interface levelingUpMove extends Move {
  learn: number;
  mastery: number;
}

interface Learnset {
  levelingUp: levelingUpMove[];
  tutoring: Move[];
}

export interface BasePokemon {
  id: number;
  pid: number;
  name: string;
  types: string[];
  altForm?: string;
  genderDiff: boolean;
  locations?: Set<string>;
  link: string;
  linkPid: string;
}

export interface BaseProps {
  pm: BasePokemon;
}

interface Evolution {
  before: BasePokemon;
  after: BasePokemon;
  require: string;
}

export interface Item {
  name: string;
  "%": number;
  boss: boolean;
}

interface ImageMap {
  m?: string;
  f?: string;
  m_s?: string;
  f_s?: string;
  s?: string;
  s_s?: string;
}

export interface Pokemon extends BasePokemon {
  getMethods: GetMethod[];
  stats: number[];
  evolution?: Evolution[];
  items: Item[];
  learnset: Learnset;
  imgPath: ImageMap;
}
interface TypeShow {
  [propName: string]: boolean;
}

export interface Filter {
  types: TypeShow;
  keyword: string;
  area: string;
  areaSelector: boolean;
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

export enum NameSuffix {
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

export interface Display {
  selectGender: string;
  shiny: boolean;
  actionTab: string;
}
