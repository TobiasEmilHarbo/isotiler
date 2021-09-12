import LayerRenderer from "./LayerRenderer";
import TileGrid from "../TileGrid";
import Tile from "../Tile";
import Camera from "../Camera";

export default class TileRenderer implements LayerRenderer {
  private buffer = document.createElement("canvas");

  constructor(private camera: Camera, private grid: TileGrid) {
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
    context.save();
    context.clip(this.camera.viewPort);
    context.drawImage(
      this.buffer,
      this.camera.position.x,
      this.camera.position.y
    );
    context.restore();
  }

  public update(): void {}
}
