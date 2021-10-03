import Buffer from "../Buffer";
import Camera from "../Camera";
import Tile from "../tiles/Tile";
import TileGrid from "../tiles/TileGrid";
import LayerRenderer from "./LayerRenderer";

export class TileLineRenderer implements LayerRenderer {
  private buffer: Buffer;

  constructor(private camera: Camera, tiles: TileGrid) {
    this.buffer = new Buffer(
      Tile.WIDTH * tiles.columns - Tile.WIDTH * 2,
      Tile.HEIGHT * tiles.columns
    );

    tiles.forEach((tile) => {
      this.buffer.context.strokeStyle = "orange";

      this.buffer.draw(tile.perimeter);

      this.buffer.context.fillStyle = "orange";
      this.buffer.context.font = "bold 12px verdana, sans-serif ";

      this.buffer.context.textAlign = "center";
      this.buffer.context.fillText(
        `${tile.column},${tile.row}`,
        tile.center.x,
        tile.center.y + 4
      );
    });
  }

  public update(deltaTime: number) {}

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.clip(this.camera.screen);

    const { x, y } = this.camera.position.negate();

    this.buffer.drawOnTo(context, x, y);

    context.restore();
  }
}
