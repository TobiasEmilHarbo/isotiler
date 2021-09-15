import Camera from "../Camera";
import Tile from "../Tile";
import TileGrid from "../TileGrid";
import LayerRenderer from "./LayerRenderer";

export class TileConstructionLineRenderer implements LayerRenderer {
  private tilePerimeterBuffer: HTMLCanvasElement;

  constructor(private camera: Camera, tiles: TileGrid) {
    this.tilePerimeterBuffer = document.createElement("canvas");
    this.tilePerimeterBuffer.width = tiles.columns * Tile.WIDTH;
    this.tilePerimeterBuffer.height = tiles.rows * Tile.HEIGHT;

    const context = this.tilePerimeterBuffer.getContext("2d");

    tiles.asArray().forEach((tile) => {
      context.strokeStyle = "orange";

      tile.perimeter.draw(context);

      context.fillStyle = "orange";
      context.font = "bold 14px verdana, sans-serif ";

      context.fillText(
        `${tile.column},${tile.row}`,
        tile.center.x - 10,
        tile.center.y + 5
      );
    });
  }

  public update(deltaTime: number) {}

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.clip(this.camera.screen);

    const { x, y } = this.camera.position.negate();

    context.drawImage(this.tilePerimeterBuffer, x, y);

    context.restore();
  }
}
