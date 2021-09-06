import Tile from "./Tile";

export default class TileGrid {
  private tiles = new Array<Tile>();
  private grid = new Map<number, Map<number, Tile>>();

  public columns: number = 0;
  public rows: number = 0;

  public add(tile: Tile) {
    this.tiles.push(tile);

    if (this.grid.has(tile.column)) {
      const column = this.grid.get(tile.column);

      column.set(tile.row, tile);

      this.columns = Math.max(tile.column, this.columns);
      this.rows = Math.max(tile.row, this.rows);
      return;
    }

    const newRow = new Map<number, Tile>();

    newRow.set(tile.row, tile);

    this.grid.set(tile.column, newRow);

    this.columns = Math.max(tile.column, this.columns);
    this.rows = Math.max(tile.row, this.rows);
  }

  public get(columnIndex: number, rowIndex: number): Tile {
    if (this.grid.has(columnIndex)) {
      const column = this.grid.get(columnIndex);
      return column.get(rowIndex);
    }
    return null;
  }

  public has(columnIndex: number, rowIndex: number): boolean {
    if (this.grid.has(columnIndex)) {
      const column = this.grid.get(columnIndex);
      return column.has(rowIndex);
    }
    return false;
  }

  public asArray(): Array<Tile> {
    return this.tiles;
  }
}
