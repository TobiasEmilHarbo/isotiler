import LayerRenderer from "./LayerRenderer";
import TileGrid from "../TileGrid";
import Tile from "../Tile";
import Camera from "../Camera";
import Buffer from "../Buffer";

export default class TileRenderer implements LayerRenderer {
  private buffer: Buffer;

  constructor(private camera: Camera, private grid: TileGrid) {
    this.buffer = new Buffer(
      Tile.WIDTH * this.grid.rows - Tile.WIDTH / 2,
      Tile.HEIGHT * this.grid.rows
    );

    this.grid.forEach((tile) => {
      if (!tile) return;
      this.buffer.draw(tile);
    });
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.clip(this.camera.screen);

    const { x, y } = this.camera.position.negate();

    this.buffer.drawOnTo(context, x, y);
    context.restore();
  }

  public update(): void {}
}
