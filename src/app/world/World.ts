export default interface World {
  [name: string]: {
    rows: number;
    columns: number;
    spriteName: string;
    tiles: Array<string>;
  };
}
