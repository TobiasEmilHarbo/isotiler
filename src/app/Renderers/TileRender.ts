import LayerRenderer from "./LayerRenderer";
import TileGrid from "../TileGrid";
import Tile from "../Tile";

export default class TileRenderer implements LayerRenderer {
  private buffer = document.createElement("canvas");

  constructor(private grid: TileGrid) {
    this.buffer.width = Tile.WIDTH * this.grid.columns;
    this.buffer.height = Tile.HEIGHT * this.grid.rows;
    for (let column = 0; column < this.grid.columns; column++) {
      for (let row = 0; row < this.grid.rows; row++) {
        const tile = this.grid.get(column, row);
        tile.draw(this.buffer.getContext("2d"));
      }
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.buffer, 0, 0);
  }

  public update(): void {}
}
