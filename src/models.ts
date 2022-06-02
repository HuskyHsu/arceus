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
  shiny?: boolean;
}

export interface BossPokemon extends BasePokemon {
  level: number;
  time: string;
  point: number[];
}

export interface EventPokemon extends BasePokemon {
  level: number;
  attr: string;
  point: number[];
}

export interface BaseProps {
  pm: BasePokemon;
}

interface Evolution {
  before: BasePokemon;
  after: BasePokemon;
  require: string;
  evolution?: Evolution[];
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

export interface FilterContextInterface {
  updateKeywordFilter: Function;
  updateTypeFilter: Function;
  toggereTypeSelect: Function;
  toggereAreaSelect: Function;
  updateAreaSelect: Function;
  filter: Filter;
}

export enum TypeMap {
  "一般" = "Normal",
  "草" = "Grass",
  "火" = "Fire",
  "水" = "Water",
  "電" = "Electric",
  "蟲" = "Bug",
  "妖精" = "Fairy",
  "格鬥" = "Fighting",
  "飛行" = "Flying",
  "幽靈" = "Ghost",
  "地面" = "Ground",
  "岩石" = "Rock",
  "冰" = "Ice",
  "毒" = "Poison",
  "超能力" = "Psychic",
  "鋼" = "Steel",
  "惡" = "Dark",
  "龍" = "Dragon",
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

export interface MultiPoint {
  id: number;
  points: number[][];
  convexHull?: number[];
  attr?: string;
}

export interface mapPm {
  spawntables: number[];
  boss: boolean;
  event: boolean;
  mass: boolean;
  massive: boolean;
  distortion: boolean;
}

interface MapPms {
  [propName: string]: mapPm;
}

export interface MapData {
  respawn: MultiPoint[];
  tree: MultiPoint[];
  crystal: MultiPoint[];
  boss: BossPokemon[];
  event: EventPokemon[];
  spiritomb: MultiPoint[];
  unown: MultiPoint[];
  pmTable: MapPms;
}

export enum MapSetTypes {
  respawn = "respawn",
  tree = "tree",
  crystal = "crystal",
}

export enum MapInfoTypes {
  boss = "boss",
  event = "event",
}

export enum MapPointTypes {
  spiritomb = "spiritomb",
  unown = "unown",
}
export interface Haunt {
  link: string;
  name: string;
  alpha: boolean;
  "%": number;
  level: string;
}
export interface SpawnTable {
  condition: string;
  data: Haunt[];
}

export interface MapProps {
  mapData: MapData;
  filter: Filter;
  type?: string;
  color?: string;
  updateKeywordFilter: Function;
}
