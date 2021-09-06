import Tile from "./Tile";
import TileGrid from "./TileGrid";

export default class TileResolver {
  public constructor(private tiles: TileGrid) {}
  public resolve(x: number, y: number): Tile {
    const tileWidth = 128;
    const tileHeight = 64;

    const determinate = (tileWidth * tileHeight) / 2;

    const rows = 7;

    const offset = (rows * Math.pow(tileHeight, 2)) / 2;

    const column =
      ((x * tileHeight) / 2 + (y * tileWidth) / 2 - offset) / determinate;

    const row =
      ((x * -tileHeight) / 2 + (y * tileWidth) / 2 + offset) / determinate;

    return this.tiles.get(column, row);
  }
}
