import LayerRenderer from "./LayerRenderer";
import TileGrid from "../tiles/TileGrid";
import Tile from "../tiles/Tile";
import Camera from "../Camera";
import Buffer from "../Buffer";

export default class TileRenderer implements LayerRenderer {
  private buffer: Buffer;

  constructor(private camera: Camera, grid: TileGrid) {
    this.buffer = new Buffer(
      Tile.WIDTH * grid.columns - Tile.WIDTH / 2,
      Tile.HEIGHT * grid.columns
    );

    grid.forEach((tile) => {
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
