import { Drawable } from "./library/Drawable";
import SpriteSheet from "./SpriteSheet";
import symbolSpriteMap from "./Mappers";
import Tile from "./Tile";

const TILE_WIDTH: number = 128;
const TILE_HEIGHT: number = 64;

export default class TileRenderer implements Drawable {
  private buffer = document.createElement("canvas");

  constructor(
    rows: number,
    columns: number,
    sprites: SpriteSheet,
    tileMap: Array<string>
  ) {
    this.buffer.width = TILE_WIDTH * columns;
    this.buffer.height = TILE_HEIGHT * rows;

    for (let x = 0; x < rows; x++) {
      const row = tileMap[x];

      for (let y = 0; y < columns; y++) {
        const spriteName = symbolSpriteMap.get(row.charAt(y));
        const sprite = sprites.get(`${spriteName}-0`);

        const sX =
          this.buffer.width / 2 + (x - y) * (TILE_WIDTH / 2) - TILE_WIDTH / 2;
        const sY = (x + y) * (TILE_HEIGHT / 2);

        const tile = new Tile(sX, sY, sprite);

        tile.draw(this.buffer.getContext("2d"));
      }
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.buffer, 0, 0);
  }
}
