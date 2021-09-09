import Tile from "../Tile";
import TileGrid from "../TileGrid";
import LayerRenderer from "./LayerRenderer";

export class TileConstructionLineRenderer implements LayerRenderer {
  private tilePerimeterBuffer: HTMLCanvasElement;

  constructor(tiles: TileGrid) {
    this.tilePerimeterBuffer = document.createElement("canvas");
    this.tilePerimeterBuffer.width = tiles.columns * Tile.WIDTH;
    this.tilePerimeterBuffer.height = tiles.rows * Tile.HEIGHT;

    const context = this.tilePerimeterBuffer.getContext("2d");

    tiles.asArray().forEach((tile) => {
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
    context.drawImage(this.tilePerimeterBuffer, 0, 0);
  }
}
