import Buffer from "../Buffer";
import Camera from "../Camera";
import { RoadTile } from "../tiles/RoadTile";
import Tile from "../tiles/Tile";
import TileGrid from "../tiles/TileGrid";
import TileResolver from "../tiles/TileResolver";
import LayerRenderer from "./LayerRenderer";

export class TileLineRenderer implements LayerRenderer {
  private buffer: Buffer;

  constructor(private camera: Camera, tiles: TileGrid) {
    this.buffer = new Buffer(
      Tile.WIDTH * tiles.columns - Tile.WIDTH * 2,
      Tile.HEIGHT * tiles.columns
    );

    tiles.forEach((tile) => {
      this.buffer.context.strokeStyle = "black";

      this.buffer.draw(tile.perimeter);

      if (tile instanceof RoadTile) {
        this.buffer.context.strokeStyle = "red";

        for (let path of tile.getPaths()) {
          this.buffer.draw(path);
        }
      }

      // this.buffer.context.fillStyle = "orange";
      // this.buffer.context.font = "bold 12px verdana, sans-serif ";

      // this.buffer.context.textAlign = "center";
      // this.buffer.context.fillText(
      //   `${tile.column},${tile.row}`,
      //   tile.center.x,
      //   tile.center.y + 4
      // );
    });

    const roadTiles = [
      { column: 8, row: 10 },
      { column: 7, row: 10 },
      { column: 7, row: 11 },
      { column: 7, row: 12 },
      { column: 7, row: 13 },
      { column: 8, row: 13 },
      { column: 9, row: 13 },
      { column: 10, row: 13 },
      { column: 10, row: 12 },
      { column: 10, row: 11 },
      { column: 10, row: 10 },
      { column: 10, row: 9 },
      { column: 10, row: 8 },
      { column: 11, row: 8 },
      { column: 12, row: 8 },
      { column: 13, row: 8 },
      { column: 14, row: 8 },
      { column: 14, row: 9 },
      { column: 14, row: 10 },
      { column: 13, row: 10 },
      { column: 12, row: 10 },
      { column: 11, row: 10 },
      { column: 10, row: 10 },
      { column: 9, row: 10 },
      { column: 8, row: 10 },
    ];

    this.buffer.context.strokeStyle = "blue";

    for (let index = 0; index < roadTiles.length; index++) {
      const coorA = roadTiles[index - 1];
      const coorB = roadTiles[index];
      const coorC = roadTiles[index + 1];
      if (!coorA || !coorC) continue;

      const tileA = tiles.get(coorA.column, coorA.row);
      const tileB = tiles.get(coorB.column, coorB.row);
      const tileC = tiles.get(coorC.column, coorC.row);

      if (tileB instanceof RoadTile) {
        const path = tileB.getPath(tileA, tileC);
        this.buffer.draw(path);
      }
    }
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
