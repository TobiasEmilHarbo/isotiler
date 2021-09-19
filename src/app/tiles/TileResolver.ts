import Tile from "./Tile";
import TileGrid from "./TileGrid";

export default class TileResolver {
  public constructor(private tiles: TileGrid) {}
  public resolve(x: number, y: number): Tile {
    const determinate = (Tile.WIDTH * Tile.HEIGHT) / 2;

    const offset = (this.tiles.rows * Math.pow(Tile.HEIGHT, 2)) / 2;

    const column =
      ((x * Tile.HEIGHT) / 2 + (y * Tile.WIDTH) / 2 - offset) / determinate;

    const row =
      ((x * -Tile.HEIGHT) / 2 + (y * Tile.WIDTH) / 2 + offset) / determinate;

    return this.tiles.get(Math.floor(column), Math.floor(row));
  }
}
