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

  public getAdjacentTiles(
    tile: Tile,
    type?: string,
    includeCorners: boolean = false
  ) {
    let offsets = [
      { column: 0, row: -1 },
      { column: 1, row: 0 },
      { column: 0, row: 1 },
      { column: -1, row: 0 },
    ];

    if (includeCorners) {
      offsets = [
        { column: -1, row: -1 },
        offsets[0],
        { column: 1, row: -1 },
        offsets[1],
        { column: 1, row: 1 },
        offsets[2],
        { column: -1, row: 1 },
        offsets[3],
      ];
    }

    const adjacentRoadTile = offsets.map((offset) =>
      this.tiles.get(tile.column + offset.column, tile.row + offset.row)
    );

    if (!type) {
      return adjacentRoadTile;
    }

    return adjacentRoadTile.filter((tile) => tile.type == type);
  }
}
