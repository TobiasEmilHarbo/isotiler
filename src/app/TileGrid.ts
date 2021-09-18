import Tile from "./Tile";

export default class TileGrid {
  private tiles = new Array<Tile>();
  private grid = new Map<number, Map<number, Tile>>();

  private _columns: number = 0;
  private _rows: number = 0;

  public get columns(): number {
    return this._columns + 1;
  }

  public get rows(): number {
    return this._rows + 1;
  }

  public add(tile: Tile) {
    this.tiles.push(tile);

    if (this.grid.has(tile.column)) {
      const column = this.grid.get(tile.column);

      column.set(tile.row, tile);

      this._columns = Math.max(tile.column, this._columns);
      this._rows = Math.max(tile.row, this._rows);
      return;
    }

    const newRow = new Map<number, Tile>();

    newRow.set(tile.row, tile);

    this.grid.set(tile.column, newRow);

    this._columns = Math.max(tile.column, this._columns);
    this._rows = Math.max(tile.row, this._rows);
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

  public forEach(
    callback: (tile: Tile, column: number, row: number) => void
  ): void {
    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        const tile = this.get(column, row);
        callback(tile, column, row);
      }
    }
  }

  public asArray(): Array<Tile> {
    return this.tiles;
  }
}
